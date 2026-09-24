<script setup>
import { iniciarSessaoDemo } from '../utils/interface'
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')

const mostrarSenha = ref(false)
const mostrarConfirmarSenha = ref(false)

const erro = ref('')
const cadastrando = ref(false)
let cadastroTimer
onUnmounted(() => clearTimeout(cadastroTimer))

function cadastrar() {
  if (cadastrando.value) return
  nome.value = nome.value.trim()
  email.value = email.value.trim()
  erro.value = ''

  if (
    !nome.value ||
    !email.value ||
    !senha.value ||
    !confirmarSenha.value
  ) {
    erro.value = 'Preencha todos os campos.'
    return
  }

  if (senha.value.length < 6) {
    erro.value = 'A senha deve ter pelo menos 6 caracteres.'
    return
  }

  if (senha.value !== confirmarSenha.value) {
    erro.value = 'As senhas não são iguais.'
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    erro.value = 'Informe um e-mail válido.'
    return
  }

  cadastrando.value = true

  cadastroTimer = setTimeout(() => {


    // SALVA QUE O USUÁRIO ESTÁ LOGADO
    iniciarSessaoDemo()

    // VAI PARA O PERFIL DO EMPREENDEDOR

    cadastrando.value = false
    router.push('/cadastro/empreendedor/perfil')
  }, 700)
}

function voltarCadastro() {
  router.push('/cadastro')

}

function voltarLogin() {
  router.push('/login')
}
</script>

<template>
  <main class="min-h-screen bg-slate-100 flex justify-center">
    <section
      class="w-full max-w-105 min-h-screen bg-white flex flex-col px-5 py-8"
    >
      <!-- CABEÇALHO -->
      <div class="text-center pt-2 mb-7">
        <!-- VOLTAR -->
        <div class="flex justify-start mb-5">
          <button
            type="button"
            @click="voltarCadastro"
            class="group flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#D94E1E] transition-all duration-200"
          >
            <span
              class="text-lg transition-transform duration-200 group-hover:-translate-x-1"
            >
              ←
            </span>

            Voltar
          </button>
        </div>

        <!-- LOGO -->
        <div
          class="mx-auto mb-4 w-16 h-16 rounded-full border-2 border-slate-800 flex items-center justify-center text-3xl shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          🏙️
        </div>

        <h1
          class="text-[26px] leading-tight font-extrabold text-slate-800"
        >
          Divulgue seu trabalho
        </h1>

        <p
          class="mt-2 text-[13px] leading-relaxed text-slate-500"
        >
          Crie sua conta e apresente seus serviços para clientes da sua região.
        </p>
      </div>

      <!-- CARD -->
      <div
        class="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 transition-all duration-300 hover:shadow-md"
      >
        <!-- TÍTULO -->
        <div class="mb-5">
          <div class="flex items-center gap-2 mb-1">
            <div
              class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-base"
            >
              🔧
            </div>

            <h2 class="text-lg font-bold text-slate-800">
              Cadastro do profissional
            </h2>
          </div>

          <p class="text-xs text-slate-400 mt-2">
            Primeiro vamos criar sua conta. Depois você poderá montar seu
            perfil profissional.
          </p>
        </div>

        <!-- FORMULÁRIO -->
        <p class="mb-4 rounded-xl bg-orange-50 p-3 text-xs text-slate-600">Demonstração: não cria conta real nem verifica credenciais. Use dados fictícios; a senha não é armazenada.</p>
        <form
          @submit.prevent="cadastrar"
          class="space-y-4"
        >
          <!-- NOME -->
          <div>
            <label
              for="nome"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Nome completo
            </label>

            <input
              id="nome"
              v-model="nome"
              type="text"
              placeholder="Digite seu nome completo"
              autocomplete="name"
              class="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
            />
          </div>

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
              autocomplete="email"
              class="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
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
                placeholder="Crie uma senha"
                autocomplete="new-password"
                class="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 pr-20 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
              />

              <button
                type="button"
                @click="mostrarSenha = !mostrarSenha"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#D94E1E] hover:text-[#B83F17] transition-colors"
              >
                {{ mostrarSenha ? 'Ocultar' : 'Mostrar' }}
              </button>
            </div>

            <p class="text-[10px] text-slate-400 mt-1.5">
              Use pelo menos 6 caracteres.
            </p>
          </div>

          <!-- CONFIRMAR SENHA -->
          <div>
            <label
              for="confirmarSenha"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Confirmar senha
            </label>

            <div class="relative">
              <input
                id="confirmarSenha"
                v-model="confirmarSenha"
                :type="mostrarConfirmarSenha ? 'text' : 'password'"
                placeholder="Digite sua senha novamente"
                autocomplete="new-password"
                class="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 pr-20 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
              />

              <button
                type="button"
                @click="mostrarConfirmarSenha = !mostrarConfirmarSenha"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#D94E1E] hover:text-[#B83F17] transition-colors"
              >
                {{ mostrarConfirmarSenha ? 'Ocultar' : 'Mostrar' }}
              </button>
            </div>
          </div>

          <!-- ERRO -->
          <div
            v-if="erro"
            class="bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 animate-pulse"
          >
            <p class="text-xs font-medium text-red-600">
              {{ erro }}
            </p>
          </div>

          <!-- BOTÃO -->
          <button
            type="submit"
            :disabled="cadastrando"
            class="group relative w-full overflow-hidden bg-[#D94E1E] text-white px-4 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 hover:bg-[#C34418] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span
              v-if="!cadastrando"
              class="relative z-10"
            >
              Continuar cadastro
            </span>

            <span
              v-else
              class="relative z-10 flex items-center justify-center gap-2"
            >
              <span
                class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
              ></span>

              Criando conta...
            </span>

            <!-- EFEITO DE BRILHO -->
            <span
              class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent"
            ></span>
          </button>
        </form>

        <!-- DIVISOR -->
        <div class="flex items-center gap-3 my-5">
          <div class="flex-1 h-px bg-slate-100"></div>

          <span class="text-[10px] text-slate-400 font-medium">
            JÁ POSSUI UMA CONTA?
          </span>

          <div class="flex-1 h-px bg-slate-100"></div>
        </div>

        <!-- LOGIN -->
        <button
          type="button"
          @click="voltarLogin"
          class="w-full border border-[#D94E1E] text-[#D94E1E] px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 hover:bg-orange-50 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98]"
        >
          Entrar na minha conta
        </button>
      </div>

      <!-- RODAPÉ -->
      <div class="mt-auto pt-6 text-center">
        <p class="text-[10px] text-slate-400">
          Conectando você aos profissionais da sua região.
        </p>
      </div>
    </section>
  </main>

</template>
