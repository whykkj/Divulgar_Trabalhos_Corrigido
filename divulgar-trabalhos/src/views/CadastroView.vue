<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function cadastrarCliente() {
  router.push('/cadastro/cliente')
}

function cadastrarEmpreendedor() {
  router.push('/cadastro/empreendedor')
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
      <div class="text-center pt-4 mb-8">

        <!-- LOGO -->
        <div
          class="mx-auto mb-4 w-16 h-16 rounded-full border-2 border-slate-800 flex items-center justify-center text-3xl shadow-sm"
        >
          🏙️
        </div>

        <h1 class="text-[26px] leading-tight font-extrabold text-slate-800">
          Criar sua conta
        </h1>

        <p class="mt-2 text-[13px] leading-relaxed text-slate-500">
          Primeiro, escolha como você deseja usar o Divulgar Trabalhos.
        </p>
      </div>

      <!-- PERGUNTA -->
      <div class="mb-5">
        <h2 class="text-lg font-bold text-slate-800 text-center">
          O que você deseja fazer?
        </h2>

        <p class="text-xs text-slate-400 text-center mt-1">
          Você poderá completar seu perfil depois.
        </p>
      </div>

      <!-- OPÇÕES -->
      <div class="space-y-4">

        <!-- CLIENTE -->
        <button
          type="button"
          @click="cadastrarCliente"
          class="group w-full text-left bg-white border border-slate-200 rounded-2xl p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#D94E1E] active:scale-[0.98] active:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D94E1E]/20"
        >
          <div class="flex items-center gap-4">

            <!-- ÍCONE -->
            <div
              class="shrink-0 w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl transition-all duration-200 group-hover:bg-orange-100 group-hover:scale-105"
            >
              🔎
            </div>

            <!-- TEXTO -->
            <div class="flex-1 min-w-0">
              <h3
                class="text-sm font-bold text-slate-800 transition-colors group-hover:text-[#D94E1E]"
              >
                Quero contratar um serviço
              </h3>

              <p class="text-xs leading-relaxed text-slate-500 mt-1">
                Encontre profissionais e serviços perto de você.
              </p>
            </div>

            <!-- SETA -->
            <div
              class="text-slate-300 text-lg transition-all duration-200 group-hover:text-[#D94E1E] group-hover:translate-x-1"
            >
              →
            </div>

          </div>
        </button>

        <!-- EMPREENDEDOR -->
        <button
          type="button"
          @click="cadastrarEmpreendedor"
          class="group w-full text-left bg-white border border-slate-200 rounded-2xl p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#D94E1E] active:scale-[0.98] active:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D94E1E]/20"
        >
          <div class="flex items-center gap-4">

            <!-- ÍCONE -->
            <div
              class="shrink-0 w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl transition-all duration-200 group-hover:bg-amber-100 group-hover:scale-105"
            >
              🔧
            </div>

            <!-- TEXTO -->
            <div class="flex-1 min-w-0">
              <h3
                class="text-sm font-bold text-slate-800 transition-colors group-hover:text-[#D94E1E]"
              >
                Quero divulgar meu serviço
              </h3>

              <p class="text-xs leading-relaxed text-slate-500 mt-1">
                Cadastre seu trabalho e seja encontrado por clientes.
              </p>
            </div>

            <!-- SETA -->
            <div
              class="text-slate-300 text-lg transition-all duration-200 group-hover:text-[#D94E1E] group-hover:translate-x-1"
            >
              →
            </div>

          </div>
        </button>

      </div>

      <!-- DIVISOR -->
      <div class="flex items-center gap-3 my-7">
        <div class="flex-1 h-px bg-slate-100"></div>

        <span class="text-[10px] text-slate-400 font-medium">
          JÁ POSSUI UMA CONTA?
        </span>

        <div class="flex-1 h-px bg-slate-100"></div>
      </div>

      <!-- VOLTAR PARA LOGIN -->
      <button
        type="button"
        @click="voltarLogin"
        class="w-full border border-slate-200 text-slate-600 px-4 py-3 rounded-xl font-bold text-xs hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all"
      >
        Voltar para o login
      </button>

      <!-- RODAPÉ -->
      <div class="mt-auto pt-8 text-center">
        <p class="text-[10px] text-slate-400">
          Conectando você aos profissionais da sua região.
        </p>
      </div>
    </section>
  </main>
</template>
