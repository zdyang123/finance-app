<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/utils/helpers'

interface LoginForm {
  username: string
  password: string
}

const router = useRouter()
const { showToast } = useToast()

const loading = ref(false)
const visitorLogin = ref(false)
const form = reactive<LoginForm>({
  username: '',
  password: '',
})

const canSubmit = computed(() => {
  if (visitorLogin.value) return form.username.trim().length > 0
  return form.username.trim().length > 0 && form.password.trim().length > 0
})

const submitText = computed(() => (visitorLogin.value ? '游客登录' : '登录'))

const validateForm = () => {
  if (!form.username.trim()) {
    showToast('请输入账号')
    return false
  }

  if (!visitorLogin.value && !form.password.trim()) {
    showToast('请输入密码')
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateForm() || loading.value) return

  loading.value = true

  try {
    const userMessage = {
      username: form.username.trim(),
      loginType: visitorLogin.value ? 'visitor' : 'account',
      loginAt: new Date().toISOString(),
    }

    localStorage.setItem('user_message', JSON.stringify(userMessage))
    showToast('登录成功')

    setTimeout(() => {
      router.push({ name: 'home' })
    }, 350)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login">
    <section class="login-panel">
      <div class="brand-mark">钱</div>

      <div class="welcome">
        <span class="eyebrow">Welcome back</span>
        <h1>欢迎登录</h1>
        <p>继续记录今天的每一笔收入与支出。</p>
      </div>

      <nut-form class="login-form">
        <nut-form-item label="账号">
          <nut-input
            v-model="form.username"
            clearable
            placeholder="请输入账号"
            @keyup.enter="handleSubmit"
          />
        </nut-form-item>

        <nut-form-item v-if="!visitorLogin" label="密码">
          <nut-input
            v-model="form.password"
            clearable
            type="password"
            placeholder="请输入密码"
            @keyup.enter="handleSubmit"
          />
        </nut-form-item>

        <nut-form-item class="visitor-item">
          <nut-checkbox v-model="visitorLogin">游客登录</nut-checkbox>
          <span class="visitor-tip">仅初次体验使用，正式数据请使用账号登录</span>
        </nut-form-item>

        <nut-button
          block
          type="primary"
          class="submit-btn"
          :loading="loading"
          :disabled="!canSubmit"
          @click="handleSubmit"
        >
          {{ submitText }}
        </nut-button>
      </nut-form>

      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" class="miit">
        赣ICP备2024034568号-1
      </a>
    </section>
  </main>
</template>

<style scoped lang="less">
.login {
  min-height: 100vh;
  padding: 32px 18px;
  background:
    radial-gradient(circle at 18% 14%, rgba(62, 207, 178, 0.28), transparent 28%),
    linear-gradient(145deg, #eef8f6 0%, #f4f7fb 48%, #eef3fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-panel {
  width: min(100%, 390px);
  min-height: 620px;
  padding: 34px 24px 22px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 24px 60px rgba(28, 33, 48, 0.12);
  display: flex;
  flex-direction: column;
}

.brand-mark {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  background: linear-gradient(135deg, #3ecfb2, #28b39a);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(62, 207, 178, 0.32);
}

.welcome {
  margin-top: 34px;
  margin-bottom: 30px;

  .eyebrow {
    color: #28b39a;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  h1 {
    margin: 8px 0 10px;
    color: #1c2130;
    font-size: 34px;
    line-height: 1.12;
    font-weight: 800;
  }

  p {
    margin: 0;
    color: #8b9cb1;
    font-size: 14px;
    line-height: 1.7;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;

  :deep(.nut-cell-group__wrap) {
    box-shadow: none;
    background: transparent;
  }

  :deep(.nut-cell) {
    padding: 0;
    background: transparent;
    box-shadow: none;
  }

  :deep(.nut-form-item__label) {
    width: 48px;
    color: #1c2130;
    font-size: 14px;
    font-weight: 700;
  }

  :deep(.nut-form-item__body) {
    min-height: auto;
  }

  :deep(.nut-input) {
    min-height: 52px;
    padding: 0 15px;
    border-radius: 14px;
    background: #f0f4f8;
    color: #1c2130;
  }

  :deep(.nut-input__input) {
    font-size: 14px;
  }
}

.visitor-item {
  :deep(.nut-form-item__body) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  :deep(.nut-checkbox__label) {
    color: #1c2130;
    font-size: 13px;
    font-weight: 600;
  }
}

.visitor-tip {
  color: #ff6b6b;
  font-size: 12px;
  line-height: 1.5;
}

.submit-btn {
  margin-top: 8px;
  height: 50px;
  border-radius: 15px;
  border: none;
  background: linear-gradient(135deg, #3ecfb2, #28b39a);
  box-shadow: 0 12px 22px rgba(62, 207, 178, 0.28);
  font-size: 16px;
  font-weight: 700;

  &.nut-button--disabled {
    opacity: 0.45;
  }
}

.miit {
  margin-top: auto;
  padding-top: 32px;
  color: #a4b0c0;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
}
</style>
