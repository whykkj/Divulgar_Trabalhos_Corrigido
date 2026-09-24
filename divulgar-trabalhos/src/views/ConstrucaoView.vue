<script setup>
import PerfilModal from '../components/PerfilModal.vue'
import { informar, focarBusca, subirPagina, normalizarTexto } from '../utils/interface'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const profissionalSelecionado = ref(null)
const subcategoriaAtiva = ref('Todas')
const ordenacao = ref('distancia')
const mostrarFiltro = ref(false)

const subcategorias = [
  { nome: 'Todas', icone: 'done' },
  { nome: 'Pedreiros', icone: 'foundation' },
  { nome: 'Pintores', icone: 'format_paint' },
  { nome: 'Eletricistas', icone: 'bolt' },
  { nome: 'Encanadores', icone: 'plumbing' },
  { nome: 'Gesseiros', icone: 'home_repair_service' },
  { nome: 'Serralheiros', icone: 'hardware' }
]

const profissionais = ref([
  {
    nome: 'Seu Carlos Alvenaria & Reformas',
    profissao: 'Pedreiro & Mestre de Obras',
    categoria: 'Pedreiros',
    avaliacao: 4.9,
    avaliacoes: 128,
    bairro: 'Marco',
    distancia: 1.2,
    disponibilidade: 'Disponível',
    precoTitulo: 'Preço base',
    preco: 'A partir de R$ 150/dia',
    especialidades: ['Alvenaria', 'Revestimento', 'Pisos'],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRIjhovBHzmz3F4SwX52fNOXXmFkbaWKbLIb6cAl7tGG_pIBgWzbWRxxom-AdZQmS5CfcDhf_78bil33TERy3HR9g3zpHp3ZD1Ajcw0mDIIdq1DmXxp-HQgUUKJd0srSp4YS7TbTyWPkh3efkSIjrN1gzsSGyGTuHgzXaiz8vu89x6RQFjG1Yr1QrXoowspMtpf_rieeWyKK3nJBh00OokjHIVjV1wCYifkMo-yGQ8Ow-ZVfCpLVWb'
  },
  {
    nome: 'Marcos Vinícius Pinturas',
    profissao: 'Pintor Residencial & Comercial',
    categoria: 'Pintores',
    avaliacao: 4.8,
    avaliacoes: 94,
    bairro: 'Pedreira',
    distancia: 2.4,
    disponibilidade: 'Disponível hoje',
    precoTitulo: 'Preço estimado',
    preco: 'Sob avaliação',
    especialidades: ['Pintura Lisa', 'Texturas', 'Fachadas'],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAv73x-Bpx2hZGI3E6hH1FFA-PjD8gI1zyDlv_1Irrph3LUqDkgMY60zxSW4q3vvD0qbYvE8o6sEUxrX8oLyAWjDgzwpNAgU396DONxzZSZRmk51E7GjkZZmBDVdj70R4OkTR3TZThCXCTgwdDZ4uEQTq_u9KaBJamgBMQxPdbNHSjj1g40ZFD1uzci4sYiATTbT1J4QV3v0lDLCvSYPN-cVeDYz0xrMbNSaA-JRzD-v_HYwJYJNLZy'
  },
  {
    nome: 'Roberto Elétrica Segura',
    profissao: 'Eletricista Instalador',
    categoria: 'Eletricistas',
    avaliacao: 5,
    avaliacoes: 215,
    bairro: 'Umarizal',
    distancia: 3.1,
    disponibilidade: 'Responde rápido',
    precoTitulo: 'Visita técnica',
    preco: 'R$ 80/avaliação',
    especialidades: [
      'Instalação Padrão',
      'Troca de Disjuntores',
      '110v/220v'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSzWtiCIvTqt9AoLza84Jrj1Trgje8hNc6fO7XeMGz_iz6VMq4ee-wL_EgD4thEBbzS2jJcWx0uPwN-zp8JBukyRRR7woUq-ViNudv8oyp1msMVb4XNhv2loWrCEU-MoWg5j2pyJRaRLJH1j67ggdAe8ooZ-zZs8qEoEJoB1nDaI5UoqU2aknIKIu_08SjFhzDiUIllmcT2O1fvcUeaYtUJQsm37q7v6sUrUE2mO3K9afr6eEUGuiU'
  },
  {
    nome: 'Drywall & Gesso Irmãos Silva',
    profissao: 'Gesseiro Especialista',
    categoria: 'Gesseiros',
    avaliacao: 4.7,
    avaliacoes: 62,
    bairro: 'São Brás',
    distancia: 4.5,
    disponibilidade: 'Agenda para esta semana',
    precoTitulo: 'Orçamento',
    preco: 'Sem compromisso',
    especialidades: ['Sanca de Gesso', 'Drywall', 'Molduras'],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBlzegiaydJNJNmLs25qoxnxzUJGo_UJoBHi4-wsKz5Uf2CpmzyMaubRbS-TAh7CHmVLWsqMpSu2I2eGvMcCV6JuyZbZSLGDv8AfWZXO0oXN2b529Wm2DldaswrejrumbHcqd77UgXokDd_fHjwv9F2e69OYdPQ6JRLM2Gq0OGWHLtWrXicVDvlUdfzU2bw6aUWNIo1j-3Ran6TfT3O6YbOcDJoEQ8lMJZqgvsTo-t9CpRVSgJINLyu'
  }
])

const profissionaisExibidos = computed(() => {
  let resultado = [...profissionais.value]

  if (subcategoriaAtiva.value !== 'Todas') {
    resultado = resultado.filter(
      profissional =>
        profissional.categoria === subcategoriaAtiva.value
    )
  }

  if (busca.value.trim()) {
    const termo = normalizarTexto(busca.value)

    resultado = resultado.filter(profissional =>
      `${profissional.nome} ${profissional.profissao} ${profissional.especialidades.join(' ')}`
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .includes(termo)
    )
  }

  if (ordenacao.value === 'avaliacao') {
    resultado.sort((a, b) => b.avaliacao - a.avaliacao)
  } else {
    resultado.sort((a, b) => a.distancia - b.distancia)
  }

  return resultado
})

function voltar() {
  router.push('/')
}

function alternarFiltro() {
  mostrarFiltro.value = !mostrarFiltro.value
}

function limparBusca() {
  busca.value = ''
}

function selecionarProfissional(profissional) {
  if (profissional) profissionalSelecionado.value = profissional
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">

    <!-- CABEÇALHO -->
    <header
      class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
    >
      <div
        class="max-w-5xl mx-auto h-[72px] px-4 sm:px-6 flex items-center justify-between gap-4"
      >

        <button
          type="button"
          @click="voltar"
          class="group flex items-center gap-2 text-slate-500 hover:text-[#D94E1E] transition-colors"
        >
          <span
            class="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 group-hover:bg-orange-50 transition-all"
          >
            <span class="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-0.5">
              arrow_back
            </span>
          </span>

          <span class="hidden sm:block text-xs font-bold">
            Voltar
          </span>
        </button>

        <div class="flex items-center gap-2">
          <div
            class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#D94E1E]"
          >
            <span class="material-symbols-outlined">
              construction
            </span>
          </div>

          <div class="hidden sm:block">
            <h1 class="text-sm font-extrabold text-slate-800">
              Construção
            </h1>

            <p class="text-[10px] text-slate-400">
              Serviços da sua região
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="alternarFiltro"
          class="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 hover:bg-orange-50 hover:text-[#D94E1E] transition-all active:scale-90"
          aria-label="Filtros"
        >
          <span class="material-symbols-outlined text-xl">
            tune
          </span>
        </button>
      </div>
    </header>

    <main class="pb-24">

      <!-- INTRODUÇÃO -->
      <section
        class="bg-white border-b border-slate-200"
      >
        <div
          class="max-w-5xl mx-auto px-4 sm:px-6 py-6"
        >
          <div class="flex items-start gap-4">

            <div
              class="hidden sm:flex shrink-0 w-14 h-14 rounded-2xl bg-orange-50 text-[#D94E1E] items-center justify-center"
            >
              <span class="material-symbols-outlined text-3xl">
                construction
              </span>
            </div>

            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-extrabold">
                  Encontre profissionais de construção
                </h2>

                <span
                  class="material-symbols-outlined text-[#D94E1E] text-lg"
                >
                  verified
                </span>
              </div>

              <p class="text-xs sm:text-sm text-slate-500 mt-1">
                Reformas, reparos e serviços para sua casa ou empresa.
              </p>

              <div class="flex items-center gap-1.5 mt-3">
                <span
                  class="w-2 h-2 rounded-full bg-green-500"
                ></span>

                <span class="text-[10px] font-semibold text-slate-400">
                  Profissionais disponíveis em Belém
                </span>
              </div>
            </div>
          </div>

          <!-- BUSCA -->
          <div class="relative mt-5">
            <span
              class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              search
            </span>

            <input
              v-model="busca"
              type="text"
              class="w-full h-12 pl-11 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-[#D94E1E] focus:ring-4 focus:ring-[#D94E1E]/10"
              placeholder="Buscar por serviço ou profissional..."
            />

            <button
              v-if="busca"
              type="button"
              @click="limparBusca"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D94E1E]"
            >
              <span class="material-symbols-outlined text-lg">
                close
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- SUBCATEGORIAS -->
      <section
        class="max-w-5xl mx-auto px-4 sm:px-6 pt-5"
      >
        <div
          class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          <button
            v-for="subcategoria in subcategorias"
            :key="subcategoria.nome"
            type="button"
            class="shrink-0 px-3.5 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 border transition-all duration-200 active:scale-95"
            :class="
              subcategoriaAtiva === subcategoria.nome
                ? 'bg-[#D94E1E] border-[#D94E1E] text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:border-orange-200 hover:text-[#D94E1E]'
            "
            @click="subcategoriaAtiva = subcategoria.nome"
          >
            <span class="material-symbols-outlined text-base">
              {{ subcategoria.icone }}
            </span>

            {{ subcategoria.nome }}
          </button>
        </div>
      </section>

      <!-- FILTRO EXPANDIDO -->
      <section
        v-if="mostrarFiltro"
        class="max-w-5xl mx-auto px-4 sm:px-6 pt-3"
      >
        <div
          class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-extrabold text-slate-800">
                Ordenar resultados
              </p>

              <p class="text-[10px] text-slate-400 mt-1">
                Escolha como os profissionais serão exibidos.
              </p>
            </div>

            <button
              type="button"
              @click="mostrarFiltro = false"
              class="w-8 h-8 rounded-lg hover:bg-slate-50 text-slate-400"
            >
              <span class="material-symbols-outlined text-lg">
                close
              </span>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              @click="ordenacao = 'distancia'"
              class="py-2.5 rounded-xl text-xs font-bold border transition-all"
              :class="
                ordenacao === 'distancia'
                  ? 'bg-orange-50 border-[#D94E1E] text-[#D94E1E]'
                  : 'bg-white border-slate-200 text-slate-500'
              "
            >
              📍 Mais perto
            </button>

            <button
              type="button"
              @click="ordenacao = 'avaliacao'"
              class="py-2.5 rounded-xl text-xs font-bold border transition-all"
              :class="
                ordenacao === 'avaliacao'
                  ? 'bg-orange-50 border-[#D94E1E] text-[#D94E1E]'
                  : 'bg-white border-slate-200 text-slate-500'
              "
            >
              ⭐ Melhor avaliação
            </button>
          </div>
        </div>
      </section>

      <!-- CABEÇALHO DOS RESULTADOS -->
      <section
        class="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-3"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">

          <div>
            <span
              class="text-[10px] font-bold uppercase tracking-wider text-[#D94E1E]"
            >
              Resultados
            </span>

            <h2 class="text-lg sm:text-xl font-extrabold mt-1">
              Profissionais em destaque
            </h2>

            <p class="text-[10px] sm:text-xs text-slate-400 mt-1">
              {{ profissionaisExibidos.length }} profissionais encontrados
              em Belém, PA
            </p>
          </div>

          <div
            class="hidden sm:flex bg-white border border-slate-200 p-1 rounded-xl"
          >
            <button
              type="button"
              @click="ordenacao = 'distancia'"
              class="px-3 py-2 rounded-lg text-[10px] font-bold transition-all"
              :class="
                ordenacao === 'distancia'
                  ? 'bg-orange-50 text-[#D94E1E]'
                  : 'text-slate-400'
              "
            >
              Mais perto
            </button>

            <button
              type="button"
              @click="ordenacao = 'avaliacao'"
              class="px-3 py-2 rounded-lg text-[10px] font-bold transition-all"
              :class="
                ordenacao === 'avaliacao'
                  ? 'bg-orange-50 text-[#D94E1E]'
                  : 'text-slate-400'
              "
            >
              Melhores
            </button>
          </div>
        </div>
      </section>

      <!-- PROFISSIONAIS -->
      <section
        class="max-w-5xl mx-auto px-4 sm:px-6"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <article
            v-for="profissional in profissionaisExibidos"
            :key="profissional.nome"
            class="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="p-4">

              <div class="flex gap-3">

                <div class="relative shrink-0">
                  <img
                    :src="profissional.imagem"
                    :alt="profissional.nome"
                    class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span
                    class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white"
                    title="Disponível"
                  ></span>
                </div>

                <div class="flex-1 min-w-0">

                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0">

                      <h3
                        class="text-sm font-extrabold text-slate-800 truncate group-hover:text-[#D94E1E] transition-colors"
                      >
                        {{ profissional.nome }}
                      </h3>

                      <p class="text-xs text-slate-500 mt-1">
                        {{ profissional.profissao }}
                      </p>
                    </div>

                    <div class="shrink-0 flex items-center gap-1">
                      <span class="text-amber-500 text-xs">
                        ★
                      </span>

                      <span class="text-xs font-extrabold">
                        {{ profissional.avaliacao }}
                      </span>
                    </div>
                  </div>

                  <div
                    class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2"
                  >
                    <span
                      class="flex items-center gap-1 text-[10px] text-slate-400"
                    >
                      <span class="material-symbols-outlined text-sm">
                        location_on
                      </span>

                      {{ profissional.bairro }}
                    </span>

                    <span
                      class="text-[10px] font-semibold text-green-600"
                    >
                      {{ profissional.disponibilidade }}
                    </span>
                  </div>

                  <p class="text-[10px] text-slate-400 mt-1">
                    {{ profissional.distancia }} km de você
                    · {{ profissional.avaliacoes }} avaliações
                  </p>
                </div>
              </div>

              <!-- ESPECIALIDADES -->
              <div class="flex flex-wrap gap-1.5 mt-4">
                <span
                  v-for="especialidade in profissional.especialidades"
                  :key="especialidade"
                  class="px-2.5 py-1 rounded-lg bg-orange-50 text-[#D94E1E] text-[10px] font-semibold"
                >
                  {{ especialidade }}
                </span>
              </div>

              <!-- RODAPÉ -->
              <div
                class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3"
              >
                <div>
                  <span class="block text-[10px] text-slate-400">
                    {{ profissional.precoTitulo }}
                  </span>

                  <span class="block text-sm font-extrabold text-slate-800 mt-0.5">
                    {{ profissional.preco }}
                  </span>
                </div>

                <button
                  type="button"
                  @click="selecionarProfissional(profissional)"
                  class="shrink-0 bg-[#D94E1E] text-white text-[10px] sm:text-xs font-bold px-4 py-2.5 rounded-xl transition-all hover:bg-[#C34418] hover:-translate-y-0.5 active:scale-95"
                >
                  Ver perfil
                  <span class="ml-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          </article>

        </div>

        <!-- SEM RESULTADOS -->
        <div
          v-if="profissionaisExibidos.length === 0"
          class="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm"
        >
          <div
            class="w-14 h-14 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center text-[#D94E1E] text-2xl"
          >
            🔎
          </div>

          <h3 class="text-sm font-extrabold text-slate-800 mt-4">
            Nenhum profissional encontrado
          </h3>

          <p class="text-xs text-slate-400 mt-2">
            Tente buscar por outro serviço ou categoria.
          </p>

          <button
            type="button"
            @click="limparBusca(); subcategoriaAtiva = 'Todas'"
            class="mt-5 text-xs font-bold text-[#D94E1E] hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      </section>

      <!-- AVISO -->
      <section
        class="max-w-5xl mx-auto px-4 sm:px-6 pt-6"
      >
        <div
          class="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-start gap-3"
        >
          <div
            class="shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#D94E1E]"
          >
            <span class="material-symbols-outlined">
              info
            </span>
          </div>

          <div>
            <h4 class="text-xs font-extrabold text-slate-800">
              Sobre os profissionais
            </h4>

            <p class="text-[10px] sm:text-xs text-slate-500 leading-relaxed mt-1">
              Os perfis apresentados nesta versão são exemplos do protótipo
              para demonstrar como os profissionais poderão ser encontrados
              por categoria.
            </p>
          </div>
        </div>
      </section>

    </main>

    <!-- NAVEGAÇÃO MOBILE -->
    <nav
      class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-8px_30px_rgba(15,23,42,0.08)]"
    >
      <div
        class="max-w-lg mx-auto px-4 py-2.5 flex items-center justify-around"
      >

        <button
          type="button"
          @click="voltar"
          class="group flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-slate-400 hover:text-[#D94E1E] transition-colors"
        >
          <span class="text-lg group-active:scale-75 transition-transform">
            ⌂
          </span>

          <span class="text-[10px] font-semibold">
            Início
          </span>
        </button>

        <button @click="router.push({ path: '/', hash: '#categorias' })"
          type="button"
          class="group flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-[#D94E1E]"
        >
          <span class="text-lg">
            ▦
          </span>

          <span class="text-[10px] font-bold">
            Categoria
          </span>
        </button>

        <button
          type="button"
          @click="focarBusca"
          class="group flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-slate-400 hover:text-[#D94E1E] transition-colors"
        >
          <span class="text-lg group-active:scale-75 transition-transform">
            🔍
          </span>

          <span class="text-[10px] font-semibold">
            Buscar
          </span>
        </button>

        <button
          type="button"
          @click="router.push('/login')"
          class="group flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-slate-400 hover:text-[#D94E1E] transition-colors"
        >
          <span class="text-lg group-active:scale-75 transition-transform">
            👤
          </span>

          <span class="text-[10px] font-semibold">
            Perfil
          </span>
        </button>

      </div>
    </nav>
    <PerfilModal v-if="profissionalSelecionado" :profissional="profissionalSelecionado" @fechar="profissionalSelecionado = null" />
  </div>
</template>
