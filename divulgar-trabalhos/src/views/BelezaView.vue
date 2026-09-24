<script setup>
import PerfilModal from '../components/PerfilModal.vue'
import { informar, focarBusca, subirPagina, normalizarTexto } from '../utils/interface'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const profissionalSelecionado = ref(null)
const subcategoriaAtiva = ref('Todas')
const filtroRapido = ref('')
const favoritos = ref([])
const somenteFavoritos = ref(false)

const subcategorias = [
  'Todas',
  'Cabeleireiras',
  'Manicures',
  'Maquiagem',
  'Barbearia',
  'Sobrancelhas',
  'Depilação'
]

const filtrosRapidos = [
  {
    nome: 'Atende a domicílio',
    icone: 'home_pin'
  },
  {
    nome: 'Salão próprio',
    icone: 'storefront'
  },
  {
    nome: 'Disponível hoje',
    icone: 'bolt'
  }
]

const profissionais = ref([
  {
    nome: 'Studio Camila Rocha',
    profissao: 'Cabeleireira & Colorista',
    categoria: 'Cabeleireiras',
    avaliacao: 4.9,
    avaliacoes: 185,
    bairro: 'Marco',
    distancia: 0.8,
    preco: 'R$ 80',
    disponibilidade: 'Atende a domicílio',
    atendeDomicilio: true,
    salaoProprio: true,
    disponivelHoje: true,
    especialidades: [
      'Corte Feminino',
      'Mechas & Luzes',
      'Escova Progressiva'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8n-3NcjPtyX4xPU-Tt_8IDkDWjduIr6hRC85ScEtMhdntOegQoRqpnZtzSWsc05JE61hlxAoFTqBIqpRrMyRyboDPkJsrAfRQjJEsXxbOikapqs1Q0jpoz1MK-JM_N5m7olJVeMywmTgo8HbkdF8moR32V_ZOiq5xKkuya0wc0oy2_f2ubgSFpOf82uWaHrnk2fNpZaIrPD54fKrUpbj50lUnfVjuUNqwRYkz8vvjSUEEo7RcaSnX',
    galeria: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTnJIZnLj9ZNT6db4-Y3gk472buuy9thTXIDa9Qq_fw5DAgFCRocycenX1-ExI9fyKto85VjiT_FwLAlgmdn_Os94Lw_uLGVgM-sYYH4d56Pwe2xD7Fi59ylEUFKOIY-TdiFCG_ku_Pq1uRvBQozgWD33WMCybScx7fLgG7-_jC0dzznYq-PEXNkvM0RtURCieJ_l3Kg5-r5C5cZ7ixAlAPyG761FyNyVB_FhUUpnkljvASKpTfZJy',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8M6fmyf4-rUZLE356j-Qz1RG2Fav-RYj61Tm_j_195xprBTAN4kBmbOEVSPlXOS9cMqdSiLUmn-3R6lIfbyktSYFyY2gWR4Eux6xHR3rHWjQg6NjEG3PnSIvke1Sy65D52AINfew2sGf7AaZ0--SfOg0AEU0H062QIymXuYJMv0Nzkq-wsWCof0qz-30Fb8nzF9nX5cTg3GMm7CjKMJBfciEGNuX6AK51jWMrjB-7ZpD7r8U3JBPi',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKa7V5--WqPWDHUIjWcWlIsjzwgJQMhL1IcXveyi7xXJ9h_g2KxQYhf_zmWBDJhRRRAeP9ln2X6oGM5_vmCNOb13jh8mDLqYryDpWGZQ1BA5VyW3WbVRefMXotL5yICZKZEHOdD1Qcxjx0zMwhtmqpl2fOqqHIYD2cixVc4uzjKTfxr2HrHFb8VBZAX9JJ4KO1SZMeQ30jLhc-pA2QSqk2sYiYE9UKrujR6h6liKC2yEvuLoE8cegf'
    ]
  },
  {
    nome: 'Espaço Unhas da Lu',
    profissao: 'Designer de Unhas & Manicure',
    categoria: 'Manicures',
    avaliacao: 4.8,
    avaliacoes: 142,
    bairro: 'Umarizal',
    distancia: 1.5,
    preco: 'R$ 45',
    disponibilidade: 'Disponível hoje',
    atendeDomicilio: false,
    salaoProprio: true,
    disponivelHoje: true,
    especialidades: [
      'Unhas de Gel',
      'Alongamento Fibra',
      'Nail Art'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBFRX9TVZXFHPyUNwKm9kfoEW_uZpEyzB80JLC5XmX-FUsuVE9xVdVFhqKxEF7JMmVBT2PMynHCaIbDEiziVlwPaMH9QeSUz1_BWENggudumimQQ-eps3D_TCChzKYKKzzZ_vqKMTubdjZMsgJ2W_HEbaEC5rxvPe36rc_KHeFYKvTJhSeApIEzzTbMvvhuHp4x-VGWT3p6T1mqD4NUd54AewpPbfkiOJwR_RpjEB6U2mFdHuLxR5Zx',
    galeria: []
  },
  {
    nome: 'Barbearia Raiz & Navalha',
    profissao: 'Barbeiro Especialista',
    categoria: 'Barbearia',
    avaliacao: 4.9,
    avaliacoes: 310,
    bairro: 'São Brás',
    distancia: 2,
    preco: 'R$ 50',
    disponibilidade: 'Aberto agora',
    atendeDomicilio: false,
    salaoProprio: true,
    disponivelHoje: true,
    especialidades: [
      'Corte Degradê',
      'Barboterapia',
      'Tratamento Capilar'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAq7LIXhRMwMK5C3uR8sTxdjHShyNA4EjdoXhcoZGzGoYaaeEq7A1T0oUjik-9iz2dLiMV-Gf0Ty1cZRhC5Ak0Xrbqr84-s3c6LM1NBpndJn6LseKXO4RN64E49L_PtdcASSNYCWJexwcHLO6ehr3knQpTW3q9wIWQCQM99x9IUU37tWVbRjyzAl875XZKCLCLxCjZDDy5Q_62TskrR_MrggZDwv8Ytn5OetJNP6QO5dJqhEsCx0HJa',
    galeria: []
  },
  {
    nome: 'Amanda Sobrancelhas & Make',
    profissao: 'Maquiadora & Lash Designer',
    categoria: 'Maquiagem',
    categoriaSecundaria: 'Sobrancelhas',
    avaliacao: 5,
    avaliacoes: 95,
    bairro: 'Nazaré',
    distancia: 1.2,
    preco: 'R$ 70',
    disponibilidade: '',
    atendeDomicilio: true,
    salaoProprio: false,
    disponivelHoje: false,
    especialidades: [
      'Extensão de Cílios',
      'Microblading',
      'Maquiagem Social'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMCacj_CeIsaPCozy1dl0JvBnyM5pjDjY6_PPPyqFbgik8M-C1EnRkyvDxLwp_MtBVi3y21SzegsS-wA-WrGvarzbg2aFjbp82pP5F2hBhA2Gg3i-JBEAjdnBdgRLKcZCn2ewkuUYsEHRuQH5Y2JF1VWzqlWLWKrBiE3WoHxO6hkrNFR-9_8jmao0j0KkYOffHBpQRswBvw9aEcLd5GMbQ7dibT-PxOu-5IXns87E3FazIX3n4XHco',
    galeria: []
  }
])

const profissionaisExibidos = computed(() => {
  let resultado = [...profissionais.value]

  if (subcategoriaAtiva.value !== 'Todas') {
    resultado = resultado.filter(profissional => {
      return (
        profissional.categoria === subcategoriaAtiva.value ||
        profissional.categoriaSecundaria === subcategoriaAtiva.value
      )
    })
  }

  if (filtroRapido.value === 'Atende a domicílio') {
    resultado = resultado.filter(
      profissional => profissional.atendeDomicilio
    )
  }

  if (filtroRapido.value === 'Salão próprio') {
    resultado = resultado.filter(
      profissional => profissional.salaoProprio
    )
  }

  if (filtroRapido.value === 'Disponível hoje') {
    resultado = resultado.filter(
      profissional => profissional.disponivelHoje
    )
  }

  const termo = normalizarTexto(busca.value)

  if (termo) {
    resultado = resultado.filter(profissional => {
      const conteudo = [
        profissional.nome,
        profissional.profissao,
        profissional.categoria,
        profissional.categoriaSecundaria,
        profissional.bairro,
        ...profissional.especialidades
      ]
        .filter(Boolean)
        .join(' ')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

      return conteudo.includes(termo)
    })
  }

  if (somenteFavoritos.value) resultado = resultado.filter(p => favoritos.value.includes(p.nome))
  return resultado
})

function selecionarFiltro(nome) {
  filtroRapido.value =
    filtroRapido.value === nome ? '' : nome
}

function alternarFavorito(nome) {
  if (favoritos.value.includes(nome)) {
    favoritos.value = favoritos.value.filter(
      favorito => favorito !== nome
    )
  } else {
    favoritos.value.push(nome)
  }
}

function estaFavoritado(nome) {
  return favoritos.value.includes(nome)
}

function voltar() {
  router.push('/')
}

function limparBusca() {
  busca.value = ''
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
            <span
              class="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-0.5"
            >
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
              content_cut
            </span>
          </div>

          <div class="hidden sm:block">
            <h1 class="text-sm font-extrabold text-slate-800">
              Beleza & Estética
            </h1>

            <p class="text-[10px] text-slate-400">
              Serviços da sua região
            </p>
          </div>
        </div>

        <div
          class="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center"
        >
          <span class="material-symbols-outlined text-xl">
            person
          </span>
        </div>
      </div>
    </header>

    <main class="pb-24">

      <!-- INTRODUÇÃO -->
      <section class="bg-white border-b border-slate-200">
        <div
          class="max-w-5xl mx-auto px-4 sm:px-6 py-6"
        >
          <div class="flex items-start gap-4">

            <div
              class="hidden sm:flex shrink-0 w-14 h-14 rounded-2xl bg-orange-50 text-[#D94E1E] items-center justify-center"
            >
              <span class="material-symbols-outlined text-3xl">
                content_cut
              </span>
            </div>

            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-extrabold">
                  Encontre profissionais de beleza
                </h2>

                <span
                  class="material-symbols-outlined text-[#D94E1E] text-lg"
                >
                  verified
                </span>
              </div>

              <p class="text-xs sm:text-sm text-slate-500 mt-1">
                Cuidados, estilo e bem-estar perto de você.
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
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D94E1E] transition-colors"
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
          class="flex gap-2 overflow-x-auto pb-2"
        >
          <button
            v-for="subcategoria in subcategorias"
            :key="subcategoria"
            type="button"
            class="shrink-0 px-3.5 py-2.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-all duration-200 active:scale-95"
            :class="
              subcategoriaAtiva === subcategoria
                ? 'bg-[#D94E1E] border-[#D94E1E] text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:border-orange-200 hover:text-[#D94E1E]'
            "
            @click="subcategoriaAtiva = subcategoria"
          >
            {{ subcategoria }}
          </button>
        </div>
      </section>

      <!-- LOCALIZAÇÃO E FILTROS -->
      <section
        class="max-w-5xl mx-auto px-4 sm:px-6 pt-5"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">

          <div>
            <span
              class="text-[10px] font-bold uppercase tracking-wider text-[#D94E1E]"
            >
              Resultados
            </span>

            <p class="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              {{ profissionaisExibidos.length }} profissionais em Belém, PA
            </p>
          </div>

          <span
            class="flex items-center gap-1.5 text-[10px] font-semibold text-green-600"
          >
            <span
              class="w-2 h-2 rounded-full bg-green-500"
            ></span>

            Disponíveis na região
          </span>
        </div>

        <!-- FILTROS RÁPIDOS -->
        <div
          class="flex gap-2 overflow-x-auto pb-2 mt-3"
        >
          <button
            v-for="filtro in filtrosRapidos"
            :key="filtro.nome"
            type="button"
            class="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] sm:text-xs font-bold border transition-all active:scale-95"
            :class="
              filtroRapido === filtro.nome
                ? 'bg-[#D94E1E] border-[#D94E1E] text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-orange-200 hover:text-[#D94E1E]'
            "
            @click="selecionarFiltro(filtro.nome)"
          >
            <span class="material-symbols-outlined text-sm">
              {{ filtro.icone }}
            </span>

            {{ filtro.nome }}
          </button>
        </div>
      </section>

      <!-- PROFISSIONAIS -->
      <section
        class="max-w-5xl mx-auto px-4 sm:px-6 pt-4"
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

              <!-- CABEÇALHO DO PROFISSIONAL -->
              <div class="flex items-start gap-3">

                <div class="relative shrink-0">
                  <img
                    :src="profissional.imagem"
                    :alt="profissional.nome"
                    class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span
                    class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white"
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

                    <button
                      type="button"
                      :aria-label="
                        estaFavoritado(profissional.nome)
                          ? 'Remover dos favoritos'
                          : 'Adicionar aos favoritos'
                      "
                      class="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
                      :class="
                        estaFavoritado(profissional.nome)
                          ? 'bg-orange-50 text-[#D94E1E]'
                          : 'bg-slate-50 text-slate-400 hover:bg-orange-50 hover:text-[#D94E1E]'
                      "
                      @click="alternarFavorito(profissional.nome)"
                    >
                      <span
                        class="material-symbols-outlined text-lg"
                        :style="
                          estaFavoritado(profissional.nome)
                            ? { fontVariationSettings: `'FILL' 1` }
                            : {}
                        "
                      >
                        favorite
                      </span>
                    </button>

                  </div>

                  <div
                    class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2"
                  >
                    <span class="flex items-center gap-1">
                      <span class="text-amber-500 text-xs">
                        ★
                      </span>

                      <strong class="text-xs">
                        {{ profissional.avaliacao }}
                      </strong>

                      <span class="text-[10px] text-slate-400">
                        ({{ profissional.avaliacoes }})
                      </span>
                    </span>

                    <span
                      class="text-[10px] text-slate-400"
                    >
                      📍 {{ profissional.bairro }}
                    </span>
                  </div>

                  <p class="text-[10px] text-slate-400 mt-1">
                    {{ profissional.distancia }} km de você
                  </p>
                </div>
              </div>

              <!-- GALERIA -->
              <div
                v-if="profissional.galeria.length"
                class="grid grid-cols-3 gap-1.5 mt-4 rounded-xl overflow-hidden"
              >
                <div
                  v-for="(foto, indice) in profissional.galeria"
                  :key="foto"
                  class="h-24 bg-slate-100 overflow-hidden relative"
                >
                  <img
                    :src="foto"
                    :alt="`Trabalho de ${profissional.nome}`"
                    class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <span
                    v-if="indice === 2"
                    class="absolute inset-0 bg-slate-900/45 flex items-center justify-center text-white text-xs font-bold"
                  >
                    +12
                  </span>
                </div>
              </div>

              <!-- DISPONIBILIDADE -->
              <div
                v-if="profissional.disponibilidade"
                class="mt-4"
              >
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-[10px] font-bold"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full bg-green-500"
                  ></span>

                  {{ profissional.disponibilidade }}
                </span>
              </div>

              <!-- ESPECIALIDADES -->
              <div class="flex flex-wrap gap-1.5 mt-3">
                <span
                  v-for="especialidade in profissional.especialidades"
                  :key="especialidade"
                  class="px-2.5 py-1 rounded-lg bg-orange-50 text-[#D94E1E] text-[10px] font-semibold"
                >
                  {{ especialidade }}
                </span>
              </div>

              <!-- PREÇO -->
              <div
                class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3"
              >
                <div>
                  <span class="block text-[10px] text-slate-400">
                    Valor demonstrativo
                  </span>

                  <span class="block text-base font-extrabold text-slate-800 mt-0.5">
                    {{ profissional.preco }}
                  </span>
                </div>

                <button @click="profissionalSelecionado = profissional"
                  type="button"
                  class="shrink-0 border border-[#D94E1E] text-[#D94E1E] text-[10px] sm:text-xs font-bold px-4 py-2.5 rounded-xl transition-all hover:bg-[#D94E1E] hover:text-white active:scale-95"
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
            class="w-14 h-14 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center text-[#D94E1E]"
          >
            <span class="material-symbols-outlined text-2xl">
              search_off
            </span>
          </div>

          <h3 class="text-sm font-extrabold text-slate-800 mt-4">
            Nenhum profissional encontrado
          </h3>

          <p class="text-xs text-slate-400 mt-2">
            Tente selecionar outra categoria ou alterar sua busca.
          </p>

          <button
            type="button"
            @click="busca = ''; subcategoriaAtiva = 'Todas'; filtroRapido = ''; somenteFavoritos = false"
            class="mt-5 text-xs font-bold text-[#D94E1E] hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      </section>

      <!-- AVISO DO PROTÓTIPO -->
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
              Os profissionais apresentados nesta versão são exemplos
              demonstrativos do protótipo para mostrar como a busca por
              serviços de beleza poderá funcionar.
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
          <span
            class="text-lg group-active:scale-75 transition-transform"
          >
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
          <span
            class="text-lg group-active:scale-75 transition-transform"
          >
            🔍
          </span>

          <span class="text-[10px] font-semibold">
            Buscar
          </span>
        </button>

        <button
          type="button"
          @click="somenteFavoritos = !somenteFavoritos" :aria-pressed="somenteFavoritos"
          class="group flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-slate-400 hover:text-[#D94E1E] transition-colors"
        >
          <span
            class="text-lg group-active:scale-75 transition-transform"
          >
            ♡
          </span>

          <span class="text-[10px] font-semibold">
            {{ somenteFavoritos ? 'Ver todos' : 'Favoritos' }}
          </span>
        </button>

      </div>
    </nav>

    <PerfilModal v-if="profissionalSelecionado" :profissional="profissionalSelecionado" @fechar="profissionalSelecionado = null" />
  </div>
</template>
