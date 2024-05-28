<template>
  <el-upload
    drag
    ref="uploadRef"
    :action="`${requestAPI}${api}`"
    :headers="{ Authorization: token }"
    name="files"
    :accept="accept"
    :data="extraData"
    multiple
    :disabled="disabled"
    :auto-upload="false"
    :show-file-list="false"
    :file-list="fileList"
    :on-success="onSuccess"
    :on-error="onError"
    :on-change="onChange"
    :on-progress="onProgress"
    :before-upload="beforeUpload"
  >
    <el-icon class="el-icon--upload">
      <i class="ri-upload-cloud-2-line" />
    </el-icon>
    <div class="el-upload__text">将文件拖入 或 <em>点击上传</em></div>
  </el-upload>
  <div class="fileList">
    <div class="fileTemp" v-for="file in fileList" :key="file.uid">
      <div class="leftBox">
        <i class="ri-file-list-line" />
        <span class="title">
          {{ file.name }}
        </span>
      </div>
      <div class="rightBox flex-center">
        <!-- 删除按钮 -->
        <i
          @click="removeFile(file.uid)"
          v-if="file.status === 'ready'"
          class="ri-close-line remove"
        />
        <!-- 上传中 -->
        <span v-if="file.status === 'uploading'">{{ file.percentage }}%</span>
        <!-- 成功 -->
        <i
          class="ri-checkbox-circle-line success"
          v-if="file.status === 'success'"
        />
        <!-- 失败 -->
        <i class="ri-close-circle-line error" v-if="file.status === 'fail'" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { requestAPI, ResponseCode, ResponseJson } from '@/config/request';
import { useUserStore } from '@/store/modules/user';
import {
  ElMessage,
  UploadFile,
  UploadProgressEvent,
  UploadRawFile,
  type UploadInstance
} from 'element-plus';
import { useRouter } from 'vue-router';

interface ComponentProps {
  accept?: string;
  api?: string;
  extraData?: Record<string, any>;
}
const props = withDefaults(defineProps<ComponentProps>(), {
  accept: 'all',
  api: `/upload/case_img`
});
const emits = defineEmits(['success', 'error']);
const router = useRouter();

const userStore = useUserStore();
const token = computed(() => userStore.token);
const uploadRef = ref<UploadInstance>();
const disabled = ref(false);
// 提交所有文件
const submit = () => {
  if (!fileList.value.length) {
    emits('error');
    return ElMessage.error('请选择文件');
  }
  uploadRef.value!.submit();
};
// 清空所有文件
const clean = () => {
  fileList.value = [];
};

const fileList = ref<UploadFile[]>([]);

const fileTypeValidate = (fileName: string) => {
  let check = false;
  if (props.accept !== 'all') {
    const acceptArr = props.accept.split(',').map((item) => item.trim());
    acceptArr.forEach((item) => {
      const index = fileName.indexOf(item);
      if (index + item.length === fileName.length) {
        check = true;
      }
    });
  } else {
    check = true;
  }
  return check;
};

// 文件发生变化（状态，添加，删除）
const onChange = (uploadFile: UploadFile) => {
  const file = unref(fileList).findIndex(
    (item: UploadFile) => item.uid === uploadFile.uid
  );
  if (file >= 0) {
    unref(fileList).map((item: UploadFile) => {
      if (item.uid === uploadFile.uid) {
        return uploadFile;
      } else {
        return item;
      }
    });
  } else {
    // 类型判断
    uploadFile.raw && fileTypeValidate(uploadFile.raw.name)
      ? fileList.value.push(uploadFile)
      : ElMessage.error(`文件 ${uploadFile.name} 类型不符合`);
  }
};

// 上传前
const beforeUpload = (rawFile: UploadRawFile) => {
  return new Promise((resolve, reject) => {
    const accept = fileTypeValidate(rawFile.name);
    if (accept) {
      disabled.value = true;
      resolve(rawFile);
    } else {
      reject();
    }
  });
};

// 文件进度发生变化
const onProgress = (env: UploadProgressEvent, uploadFile: UploadFile) => {
  unref(fileList).map((item: UploadFile) => {
    if (item.uid === uploadFile.uid) {
      item.percentage = env.percent;
    }
  });
};

// 网络成功后
const onSuccess = (response: ResponseJson, uploadFile: UploadFile) => {
  // 业务层面的错误或成功
  if (response.code == ResponseCode.SUCCESS) {
    // 去判断全部上传成功
    const allSuccess = unref(fileList).every(
      (item) => item.status === 'success'
    );
    if (allSuccess) {
      setTimeout(() => {
        emits('success');
        clean();
        disabled.value = false;
      }, 500);
    }
  } else if (response.code === ResponseCode.UNAUTHORIZATION) {
    disabled.value = false;
    ElMessage.error('授权已失效，请重新登录');
    userStore.logout();
    return router && router.push('/login');
  } else {
    disabled.value = false;
    ElMessage.error(`${uploadFile.name} 上传失败`);
    emits('error');
  }
};

// 网络失败后
const onError = (error: Error) => {
  // 属于网络层面的错误
  ElMessage.error('网络错误');
  emits('error', error);
};

// 删除单个文件
const removeFile = (uid: number | string) => {
  fileList.value = fileList.value.filter((item) => item.uid !== uid);
};

export interface FileUploadInstance {
  submit: () => void;
  clean: () => void;
}
defineExpose({ submit, clean });
</script>
<style lang="scss" scoped>
.fileList {
  margin-top: 10px;
  max-height: 260px;
  overflow: auto;
  & > .fileTemp {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    padding: 0 4px;
    height: 28px;
    transition: all 0.3s;
    box-sizing: border-box;
    & > .leftBox {
      width: calc(100% - 28px);
      display: inline-flex;
      align-items: center;
      & > i {
        font-size: 14px;
        color: #777;
      }
      & > span.title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 6px;
        font-size: 14px;
      }
    }
    & > .rightBox {
      width: 20px;
      height: 20px;
      cursor: pointer;
      & > span {
        font-size: 12px;
      }
      & > i.remove:hover {
        color: var(--el-color-primary);
      }
      & > i.success {
        color: var(--el-color-success);
      }
      & > i.error {
        color: var(--el-color-danger);
      }
    }
    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
