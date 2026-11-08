<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const profissional = ref(null)
const carregando = ref(true)
const erro = ref('')

async function carregarProfissional() {
  carregando.value = true
  erro.value = ''

  try {
    const id = route.params.id

    const resposta = await fetch(`/api/profissionais/${id}`)

    if (resposta.status === 404) {
      throw new Error('Profissional não encontrado.')
    }

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`)
    }

    profissional.value = await resposta.json()
  } catch (error) {
    console.error('Erro ao carregar profissional:', error)
    erro.value = error.message || 'Não foi possível carregar o profissional.'
  } finally {
    carregando.value = false
  }
}

function voltar() {
  router.back()
}

function solicitarTrabalho() {
  router.push({
    name: 'agendamento',
    params: {
      id: profissional.value.id
    }
  })
}

onMounted(() => {
  carregarProfissional()
})
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">

    <!-- CABEÇALHO -->
    <header
      class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
    >
      <div
        class="max-w-5xl mx-auto px-4 sm:px-6 h-[72px] flex items-center"
      >
        <button
          type="button"
          @click="voltar"
          class="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#D94E1E] transition-colors"
        >
          ← Voltar
        </button>
      </div>
    </header>

    <!-- CARREGANDO -->
    <main
      v-if="carregando"
      class="max-w-5xl mx-auto px-4 py-10"
    >
      <div
        class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center"
      >
        <p class="text-sm font-semibold text-slate-500">
          Carregando perfil...
        </p>
      </div>
    </main>

    <!-- ERRO -->
    <main
      v-else-if="erro"
      class="max-w-5xl mx-auto px-4 py-10"
    >
      <div
        class="bg-white rounded-3xl shadow-sm border border-red-200 p-8 text-center"
      >
        <div class="text-4xl mb-4">
          ⚠️
        </div>

        <h1 class="text-xl font-extrabold text-slate-800">
          Não foi possível carregar o perfil
        </h1>

        <p class="text-sm text-slate-500 mt-2">
          {{ erro }}
        </p>

        <button
          type="button"
          @click="voltar"
          class="mt-6 px-5 py-3 rounded-xl bg-[#D94E1E] text-white text-sm font-bold hover:opacity-90 transition"
        >
          Voltar
        </button>
      </div>
    </main>

    <!-- PERFIL -->
    <main
      v-else-if="profissional"
      class="max-w-5xl mx-auto px-4 sm:px-6 py-8"
    >

      <!-- CARD PRINCIPAL -->
      <section
        class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
      >

        <!-- TOPO -->
        <div class="bg-[#D94E1E] px-6 sm:px-8 py-8 text-white">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            <!-- FOTO -->
            <div
              class="w-32 h-32 rounded-3xl bg-white/20 overflow-hidden shrink-0 border-4 border-white/30"
            >
              <img
                v-if="profissional.imagem || profissional.foto"
                :src="profissional.imagem || profissional.foto"
                :alt="profissional.nome"
                class="w-full h-full object-cover"
              />

              <div
                v-else
                class="w-full h-full flex items-center justify-center text-5xl"
              >
                👤
              </div>
            </div>

            <!-- INFORMAÇÕES -->
            <div class="text-center sm:text-left">
              <p
                class="text-xs uppercase tracking-wider font-bold text-white/70"
              >
                Perfil profissional
              </p>

              <h1 class="text-3xl font-extrabold mt-1">
                {{ profissional.nome }}
              </h1>

              <p class="text-white/80 mt-2">
                {{ profissional.profissao || 'Profissão não informada' }}
              </p>

              <div
                v-if="profissional.categoria"
                class="inline-flex mt-4 bg-white/15 px-3 py-1.5 rounded-full text-xs font-bold"
              >
                {{ profissional.categoria }}
              </div>
            </div>

          </div>
        </div>

        <!-- CONTEÚDO -->
        <div class="p-6 sm:p-8">

          <!-- DESCRIÇÃO -->
          <div
            v-if="profissional.descricao"
            class="mb-8"
          >
            <h2 class="text-lg font-extrabold text-slate-800">
              Sobre o profissional
            </h2>

            <p class="text-sm text-slate-500 mt-2 leading-relaxed">
              {{ profissional.descricao }}
            </p>
          </div>

          <!-- INFORMAÇÕES -->
          <div>
            <h2 class="text-lg font-extrabold text-slate-800 mb-4">
              Informações
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div
                v-if="profissional.bairro"
                class="rounded-2xl bg-slate-50 p-4"
              >
                <p class="text-xs font-bold text-slate-400 uppercase">
                  Localização
                </p>

                <p class="text-sm font-semibold text-slate-700 mt-1">
                  📍 {{ profissional.bairro }}
                </p>
              </div>

              <div
                v-if="profissional.cidade || profissional.uf"
                class="rounded-2xl bg-slate-50 p-4"
              >
                <p class="text-xs font-bold text-slate-400 uppercase">
                  Cidade
                </p>

                <p class="text-sm font-semibold text-slate-700 mt-1">
                  {{ profissional.cidade || '' }}
                  {{ profissional.uf ? '- ' + profissional.uf : '' }}
                </p>
              </div>

              <div
                v-if="profissional.telefone"
                class="rounded-2xl bg-slate-50 p-4"
              >
                <p class="text-xs font-bold text-slate-400 uppercase">
                  Telefone
                </p>

                <p class="text-sm font-semibold text-slate-700 mt-1">
                  📞 {{ profissional.telefone }}
                </p>
              </div>

              <div
                v-if="profissional.avaliacao"
                class="rounded-2xl bg-slate-50 p-4"
              >
                <p class="text-xs font-bold text-slate-400 uppercase">
                  Avaliação
                </p>

                <p class="text-sm font-semibold text-slate-700 mt-1">
                  ⭐ {{ profissional.avaliacao }}
                  <span
                    v-if="profissional.avaliacoes"
                    class="text-slate-400"
                  >
                    ({{ profissional.avaliacoes }} avaliações)
                  </span>
                </p>
              </div>

            </div>
          </div>

          
          <button
          type="button"
          @click="solicitarTrabalho"
          class="w-full mt-8 bg-[#D94E1E] text-white py-4 rounded-2xl text-sm font-bold hover:opacity-90 transition"
          >
           Solicitar trabalho
         </button>

        </div>
      </section>

    </main>
  </div>
</template>