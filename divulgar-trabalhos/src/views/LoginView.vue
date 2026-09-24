<script setup>
import { iniciarSessaoDemo, informar } from '../utils/interface'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const senha = ref('')
const mostrarSenha = ref(false)
const erro = ref('')

function fazerLogin() {
  erro.value = ''

  if (!email.value || !senha.value) {
    erro.value = 'Preencha todos os campos.'
    return
  }

  // Por enquanto, apenas simulamos o login.
  // O backend será conectado posteriormente.
  iniciarSessaoDemo()
  router.push('/')
}

function irParaCadastro() {
  router.push('/cadastro')
}
</script>

<template>
  <main class="min-h-screen bg-slate-100 flex justify-center">
    <section
      class="w-full max-w-105 min-h-screen bg-white flex flex-col justify-center px-5 py-8"
    >
      <!-- CABEÇALHO -->
      <div class="text-center mb-7">
        <!-- Ícone / Logo -->
        <div
          class="mx-auto mb-4 w-16 h-16 rounded-full border-2 border-slate-800 flex items-center justify-center text-3xl"
        >
          🏙️
        </div>

        <h1 class="text-[26px] leading-tight font-extrabold text-slate-800">
          Divulgar Trabalhos
        </h1>

        <p class="mt-2 text-[13px] leading-relaxed text-slate-500">
          Entre na sua conta para encontrar e divulgar serviços.
        </p>
      </div>

      <!-- CARD DE LOGIN -->
      <div
        class="bg-white border border-slate-200 rounded-2xl shadow-sm p-5"
      >
        <div class="mb-5">
          <h2 class="text-lg font-bold text-slate-800">
            Entrar
          </h2>

          <p class="text-xs text-slate-400 mt-1">
            Acesse sua conta para continuar.
          </p>
        </div>

        <p class="mb-4 rounded-xl bg-orange-50 p-3 text-xs text-slate-600">Demonstração: não cria conta real nem verifica credenciais. Use dados fictícios; a senha não é armazenada.</p>
        <form
          @submit.prevent="fazerLogin"
          class="space-y-4"
        >
          <!-- E-MAIL -->
          <div>
            <label
              for="email"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              E-mail
            </label>

            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Digite seu e-mail"
              class="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 rounded-xl border border-slate-200 outline-none transition focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20"
            />
          </div>

          <!-- SENHA -->
          <div>
            <label
              for="senha"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Senha
            </label>

            <div class="relative">
              <input
                id="senha"
                v-model="senha"
                :type="mostrarSenha ? 'text' : 'password'"
                placeholder="Digite sua senha"
                class="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 pr-20 rounded-xl border border-slate-200 outline-none transition focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20"
              />

              <button
                type="button"
                @click="mostrarSenha = !mostrarSenha"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#D94E1E] hover:text-[#B83F17] transition-colors"
              >
                {{ mostrarSenha ? 'Ocultar' : 'Mostrar' }}
              </button>
            </div>
          </div>

          <!-- ERRO -->
          <div
            v-if="erro"
            class="bg-red-50 border border-red-100 rounded-xl px-3 py-2.5"
          >
            <p class="text-xs font-medium text-red-600">
              {{ erro }}
            </p>
          </div>

          <!-- ESQUECI SENHA -->
          <div class="text-right pt-1">
            <button
              type="button"
              @click="informar('Recuperação de senha ainda indisponível nesta demonstração. Nenhuma conta real foi criada.')"
              class="text-xs font-semibold text-[#D94E1E] hover:underline"
            >
              Esqueci minha senha
            </button>
          </div>

          <!-- BOTÃO ENTRAR -->
          <button
            type="submit"
            class="w-full bg-[#D94E1E] text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-[#C34418] active:scale-[0.99] transition-all shadow-sm"
          >
            Entrar
          </button>
        </form>

        <!-- DIVISOR -->
        <div class="flex items-center gap-3 my-5">
          <div class="flex-1 h-px bg-slate-100"></div>

          <span class="text-[10px] text-slate-400 font-medium">
            OU
          </span>

          <div class="flex-1 h-px bg-slate-100"></div>
        </div>

        <!-- CADASTRO -->
        <div class="text-center">
          <p class="text-xs text-slate-500">
            Ainda não possui uma conta?
          </p>

          <button
            type="button"
            @click="irParaCadastro"
            class="mt-2 w-full border border-[#D94E1E] text-[#D94E1E] px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-orange-50 active:scale-[0.99] transition-all"
          >
            Criar conta
          </button>
        </div>
      </div>

      <!-- RODAPÉ -->
      <p class="text-center text-[10px] text-slate-400 mt-6">
        Conectando você aos profissionais da sua região.
      </p>
    </section>
  </main>
</template>
