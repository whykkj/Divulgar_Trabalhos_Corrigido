<script setup>
import { informar, focarBusca, subirPagina, normalizarTexto } from '../utils/interface'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const subcategoriaAtiva = ref('Todos')
const filtroAtivo = ref('')
const favoritos = ref([])
const mostrarFiltros = ref(false)
const servicoSelecionado = ref(null)

const subcategorias = [
  {
    nome: 'Todos',
    icone: 'verified'
  },
  {
    nome: 'Fotografia de Eventos',
    icone: 'photo_camera'
  },
  {
    nome: 'Ensaios Fotográficos',
    icone: 'photo_library'
  },
  {
    nome: 'Casamentos',
    icone: 'favorite'
  },
  {
    nome: 'Fotografia Infantil',
    icone: 'child_friendly'
  },
  {
    nome: 'Produtos',
    icone: 'inventory_2'
  },
  {
    nome: 'Vídeos',
    icone: 'videocam'
  }
]

const filtros = [
  {
    nome: 'Disponível hoje',
    icone: 'today'
  },
  {
    nome: 'Mais perto',
    icone: 'near_me'
  },
  {
    nome: 'Melhores notas',
    icone: 'star'
  }
]

const profissionais = ref([
  {
    nome: 'Luz & Memória Fotografia',
    profissao: 'Fotógrafo de Eventos',
    categoria: 'Fotografia de Eventos',
    avaliacao: 4.9,
    avaliacoes: 184,
    bairro: 'Nazaré',
    distancia: 1.2,
    disponibilidade: 'Disponível hoje',
    destaque: 'Fotografia profissional',
    botao: 'Pedir Orçamento',
    botaoIcone: 'request_quote',
    especialidades: [
      'Aniversários',
      'Eventos Corporativos',
      'Cobertura Completa'
    ],
    imagem:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  },
  {
    nome: 'Studio Encanto',
    profissao: 'Fotógrafa de Ensaios e Casamentos',
    categoria: 'Ensaios Fotográficos',
    categoriaSecundaria: 'Casamentos',
    avaliacao: 5,
    avaliacoes: 126,
    bairro: 'Umarizal',
    distancia: 1.8,
    disponibilidade: 'Agenda aberta',
    destaque: 'Ensaios personalizados',
    botao: 'Ver Perfil',
    botaoIcone: 'person',
    especialidades: [
      'Ensaios Externos',
      'Pré-Wedding',
      'Casamentos'
    ],
    imagem:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&q=80'
  },
  {
    nome: 'Click Kids Fotografia',
    profissao: 'Fotografia Infantil e Familiar',
    categoria: 'Fotografia Infantil',
    avaliacao: 4.8,
    avaliacoes: 97,
    bairro: 'Marco',
    distancia: 2.4,
    disponibilidade: 'Disponível amanhã',
    destaque: 'Atendimento personalizado',
    botao: 'Contatar',
    botaoIcone: 'chat',
    especialidades: [
      'Festas Infantis',
      'Ensaios de Família',
      'Smash the Cake'
    ],
    imagem:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80'
  },
  {
    nome: 'Imagem Comercial',
    profissao: 'Fotografia de Produtos e Marcas',
    categoria: 'Produtos',
    avaliacao: 4.7,
    avaliacoes: 68,
    bairro: 'Batista Campos',
    distancia: 3.1,
    disponibilidade: 'Agendamento prévio',
    destaque: 'Fotos para marcas',
    botao: 'Pedir Orçamento',
    botaoIcone: 'request_quote',
    especialidades: [
      'Fotos de Produtos',
      'Catálogos',
      'Redes Sociais'
    ],
    imagem:
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80'
  }
])

const profissionaisExibidos = computed(() => {
  let resultado = [...profissionais.value]

  if (subcategoriaAtiva.value !== 'Todos') {
    resultado = resultado.filter(
      (profissional) =>
        profissional.categoria === subcategoriaAtiva.value ||
        profissional.categoriaSecundaria === subcategoriaAtiva.value
    )
  }

  const termo = normalizarTexto(busca.value)

  if (termo) {
    resultado = resultado.filter((profissional) => {
      const conteudo = [
        profissional.nome,
        profissional.profissao,
        profissional.categoria,
        profissional.categoriaSecundaria,
        profissional.bairro,
        profissional.destaque,
        ...profissional.especialidades
      ]
        .filter(Boolean)
        .join(' ')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

      return conteudo.includes(termo)
    })
  }

  if (filtroAtivo.value === 'Disponível hoje') {
    resultado = resultado.filter(
      (profissional) =>
        profissional.disponibilidade.includes('hoje')
    )
  }

  if (filtroAtivo.value === 'Mais perto') {
    resultado.sort((a, b) => a.distancia - b.distancia)
  }

  if (filtroAtivo.value === 'Melhores notas') {
    resultado.sort((a, b) => b.avaliacao - a.avaliacao)
  }

  return resultado
})

function selecionarFiltro(nome) {
  filtroAtivo.value =
    filtroAtivo.value === nome ? '' : nome
}

function alternarFavorito(nome) {
  if (favoritos.value.includes(nome)) {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito !== nome
    )
  } else {
    favoritos.value.push(nome)
  }
}

function estaFavoritado(nome) {
  return favoritos.value.includes(nome)
}

function solicitarServico(profissional) {
  servicoSelecionado.value = profissional
}

function fecharServico() {
  servicoSelecionado.value = null
}

function voltar() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">

    <!-- CABEÇALHO -->
    <header
      class="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
    >
      <div
        class="max-w-[1100px] mx-auto h-16 px-4 flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-2">
          <button
            type="button"
            aria-label="Voltar"
            class="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#D94E1E] transition"
            @click="voltar"
          >
            <span class="material-symbols-outlined text-2xl">
              arrow_back
            </span>
          </button>

          <div>
            <h1 class="text-base sm:text-lg font-bold leading-tight">
              Fotografia
            </h1>

            <p class="hidden sm:block text-xs text-slate-500">
              Profissionais perto de você
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button @click="informar('Não há notificações nesta demonstração.')"
            type="button"
            aria-label="Notificações"
            class="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#D94E1E] transition"
          >
            <span class="material-symbols-outlined text-2xl">
              notifications
            </span>
          </button>

          <div
            class="w-9 h-9 rounded-full bg-[#D94E1E] flex items-center justify-center shadow-sm"
          >
            <span class="material-symbols-outlined text-white text-lg">
              person
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- CONTEÚDO -->
    <main class="w-full pt-20 pb-24 px-4">
      <div class="max-w-[850px] mx-auto flex flex-col gap-4">

        <!-- APRESENTAÇÃO -->
        <section
          class="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200"
        >
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-2xl bg-[#FFF1EB] flex items-center justify-center text-[#D94E1E]"
              >
                <span class="material-symbols-outlined text-2xl">
                  photo_camera
                </span>
              </div>

              <div>
                <h2 class="text-lg sm:text-xl font-bold">
                  Fotografia
                </h2>

                <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Encontre fotógrafos para seus momentos
                </p>
              </div>
            </div>

            <button @click="informar('Profissionais, avaliações e distâncias são exemplos demonstrativos. Não há geolocalização ativa.')"
              type="button"
              aria-label="Informações"
              class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#D94E1E] hover:bg-[#FFF1EB] transition"
            >
              <span class="material-symbols-outlined text-xl">
                info
              </span>
            </button>
          </div>

          <!-- BUSCA -->
          <div class="relative">
            <span
              class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
            >
              search
            </span>

            <input
              v-model="busca"
              type="text"
              class="w-full h-12 pl-11 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/10 transition"
              placeholder="O que você procura em fotografia?"
            />

            <button
              type="button"
              aria-label="Abrir filtros"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-[#FFF1EB] hover:text-[#D94E1E] transition"
              @click="mostrarFiltros = !mostrarFiltros"
            >
              <span class="material-symbols-outlined text-xl">
                tune
              </span>
            </button>
          </div>

          <!-- FILTROS EXPANDIDOS -->
          <div
            v-if="mostrarFiltros"
            class="mt-3 p-3 rounded-xl bg-[#FFF1EB] border border-orange-100"
          >
            <p class="text-xs font-semibold text-slate-600 mb-2">
              Filtros rápidos
            </p>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="filtro in filtros"
                :key="filtro.nome"
                type="button"
                class="px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                :class="
                  filtroAtivo === filtro.nome
                    ? 'bg-[#D94E1E] text-white'
                    : 'bg-white text-slate-600 hover:text-[#D94E1E]'
                "
                @click="selecionarFiltro(filtro.nome)"
              >
                <span class="material-symbols-outlined text-base">
                  {{ filtro.icone }}
                </span>

                {{ filtro.nome }}
              </button>
            </div>
          </div>
        </section>

        <!-- SUBCATEGORIAS -->
        <section class="-mx-4 px-4 overflow-x-auto">
          <div class="flex gap-2 py-1">
            <button
              v-for="subcategoria in subcategorias"
              :key="subcategoria.nome"
              type="button"
              class="shrink-0 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all"
              :class="
                subcategoriaAtiva === subcategoria.nome
                  ? 'bg-[#D94E1E] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#D94E1E] hover:text-[#D94E1E]'
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

        <!-- LOCALIZAÇÃO E FILTROS -->
        <section class="flex flex-col gap-2">
          <div
            class="flex flex-wrap items-center justify-between gap-2"
          >
            <div class="flex items-center gap-1.5">
              <span
                class="material-symbols-outlined text-lg text-[#D94E1E]"
              >
                location_on
              </span>

              <strong class="text-sm">
                {{ profissionaisExibidos.length }} profissionais
              </strong>

              <span class="text-xs sm:text-sm text-slate-500">
                em Belém, PA
              </span>
            </div>

            <span
              class="flex items-center gap-1.5 text-xs font-semibold text-emerald-600"
            >
              <span
                class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              ></span>

              Disponibilidade atual
            </span>
          </div>

          <!-- FILTROS -->
          <div class="flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="filtro in filtros"
              :key="filtro.nome"
              type="button"
              class="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition"
              :class="
                filtroAtivo === filtro.nome
                  ? 'bg-[#D94E1E] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-[#D94E1E] hover:border-[#D94E1E]'
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

        <!-- DESTAQUE -->
        <section
          class="rounded-2xl p-4 sm:p-5 bg-linear-to-r from-[#D94E1E] to-[#E9683B] text-white shadow-md overflow-hidden relative"
        >
          <div class="relative z-10 flex items-center justify-between gap-4">
            <div class="max-w-[600px]">
              <span
                class="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-orange-100"
              >
                Registre seus momentos
              </span>

              <h3 class="text-lg sm:text-xl font-bold mt-1">
                Encontre o fotógrafo ideal para seu momento
              </h3>

              <p class="text-xs sm:text-sm text-orange-50 mt-1">
                Encontre profissionais para eventos, ensaios, casamentos,
                produtos e muito mais.
              </p>
            </div>

            <div
              class="hidden sm:flex w-16 h-16 rounded-2xl bg-white/15 items-center justify-center shrink-0"
            >
              <span class="material-symbols-outlined text-4xl">
                photo_camera
              </span>
            </div>
          </div>

          <div
            class="absolute -right-8 -bottom-12 w-32 h-32 rounded-full bg-white/10"
          ></div>
        </section>

        <!-- LISTA DE PROFISSIONAIS -->
        <section class="flex flex-col gap-3">
          <article
            v-for="profissional in profissionaisExibidos"
            :key="profissional.nome"
            class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <!-- CABEÇALHO DO CARD -->
            <div class="flex items-start gap-3">
              <div class="relative shrink-0">
                <img
                  :src="profissional.imagem"
                  :alt="profissional.nome"
                  class="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl object-cover bg-slate-100"
                />

                <span
                  class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white"
                ></span>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <h3 class="text-base sm:text-lg font-bold truncate">
                      {{ profissional.nome }}
                    </h3>

                    <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
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
                    class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition"
                    :class="
                      estaFavoritado(profissional.nome)
                        ? 'text-[#D94E1E] bg-[#FFF1EB]'
                        : 'text-slate-400 hover:text-[#D94E1E] hover:bg-[#FFF1EB]'
                    "
                    @click="alternarFavorito(profissional.nome)"
                  >
                    <span
                      class="material-symbols-outlined text-xl"
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

                <!-- DISPONIBILIDADE -->
                <div class="mt-1.5">
                  <span
                    class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold"
                    :class="
                      profissional.disponibilidade.includes('hoje') ||
                      profissional.disponibilidade.includes('aberta')
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    "
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="
                        profissional.disponibilidade.includes('hoje') ||
                        profissional.disponibilidade.includes('aberta')
                          ? 'bg-emerald-500 animate-pulse'
                          : 'bg-slate-400'
                      "
                    ></span>

                    {{ profissional.disponibilidade }}
                  </span>
                </div>

                <!-- AVALIAÇÃO / LOCAL -->
                <div
                  class="flex flex-wrap items-center gap-2 mt-2 text-xs"
                >
                  <span
                    class="flex items-center gap-0.5 font-bold text-amber-600"
                  >
                    <span
                      class="material-symbols-outlined text-[15px]"
                      style="font-variation-settings: 'FILL' 1"
                    >
                      star
                    </span>

                    {{ profissional.avaliacao }}
                  </span>

                  <span class="text-slate-400">
                    ({{ profissional.avaliacoes }} avaliações)
                  </span>

                  <span class="text-slate-300">
                    •
                  </span>

                  <span class="flex items-center gap-0.5 text-slate-500">
                    <span class="material-symbols-outlined text-[14px]">
                      location_on
                    </span>

                    {{ profissional.bairro }}
                    •
                    {{ profissional.distancia }} km
                  </span>
                </div>
              </div>
            </div>

            <!-- ESPECIALIDADES -->
            <div class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="especialidade in profissional.especialidades"
                :key="especialidade"
                class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] sm:text-[11px]"
              >
                {{ especialidade }}
              </span>
            </div>

            <!-- AÇÕES -->
            <div class="flex gap-2 mt-4">
              <button
                type="button"
                class="flex-1 min-h-11 rounded-xl px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition active:scale-[0.98] bg-[#FFF1EB] hover:bg-[#FFE5DC] text-[#D94E1E]"
                @click="solicitarServico(profissional)"
              >
                <span class="material-symbols-outlined text-lg">
                  {{ profissional.botaoIcone }}
                </span>

                {{ profissional.botao }}
              </button>

              <button @click="informar('As mensagens ainda não estão disponíveis nesta demonstração.')"
                type="button"
                aria-label="Abrir conversa"
                class="w-11 h-11 shrink-0 rounded-xl bg-slate-100 text-slate-500 hover:bg-[#FFF1EB] hover:text-[#D94E1E] flex items-center justify-center transition"
              >
                <span class="material-symbols-outlined text-xl">
                  chat
                </span>
              </button>
            </div>
          </article>

          <!-- NENHUM RESULTADO -->
          <div
            v-if="profissionaisExibidos.length === 0"
            class="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-200"
          >
            <div
              class="w-14 h-14 mx-auto rounded-full bg-[#FFF1EB] text-[#D94E1E] flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-3xl">
                search_off
              </span>
            </div>

            <h3 class="font-bold mt-3">
              Nenhum profissional encontrado
            </h3>

            <p class="text-sm text-slate-500 mt-1">
              Tente mudar a categoria, o filtro ou o termo da busca.
            </p>
          </div>
        </section>

        <!-- INFORMAÇÃO -->
        <section
          class="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200"
        >
          <div
            class="w-10 h-10 rounded-xl bg-[#FFF1EB] text-[#D94E1E] flex items-center justify-center shrink-0"
          >
            <span class="material-symbols-outlined">
              verified_user
            </span>
          </div>

          <div>
            <h3 class="text-sm font-bold">
              Encontre profissionais de fotografia
            </h3>

            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              Compare categorias, avaliações, distância e disponibilidade
              para encontrar o fotógrafo que melhor combina com seu momento.
            </p>
          </div>
        </section>
      </div>
    </main>

    <!-- MENU INFERIOR -->
    <nav
      class="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
    >
      <div
        class="max-w-[700px] mx-auto flex justify-around items-center h-16 px-1"
      >
        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-slate-500 hover:text-[#D94E1E] transition"
          @click="voltar"
        >
          <span class="material-symbols-outlined text-2xl">
            home
          </span>

          <span class="text-[10px]">
            Início
          </span>
        </button>

        <button @click="router.push({ path: '/', hash: '#categorias' })"
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-[#D94E1E] font-bold"
        >
          <span class="material-symbols-outlined text-2xl">
            grid_view
          </span>

          <span class="text-[10px]">
            Categorias
          </span>
        </button>

        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-slate-500 hover:text-[#D94E1E] transition"
          @click="focarBusca"
        >
          <span class="material-symbols-outlined text-2xl">
            search
          </span>

          <span class="text-[10px]">
            Buscar
          </span>
        </button>

        <button @click="informar('As mensagens ainda não estão disponíveis nesta demonstração.')"
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-slate-500 hover:text-[#D94E1E] transition"
        >
          <span class="material-symbols-outlined text-2xl">
            chat
          </span>

          <span class="text-[10px]">
            Mensagens
          </span>
        </button>

        <button @click="router.push('/login')"
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-slate-500 hover:text-[#D94E1E] transition"
        >
          <span class="material-symbols-outlined text-2xl">
            person
          </span>

          <span class="text-[10px]">
            Perfil
          </span>
        </button>
      </div>
    </nav>

    <!-- MODAL DEMONSTRATIVO -->
    <div
      v-if="servicoSelecionado"
      class="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      @click.self="fecharServico"
    >
      <div
        class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5"
      >
        <div class="flex items-center justify-between gap-3">
          <div>
            <span
              class="text-xs font-bold uppercase tracking-wide text-[#D94E1E]"
            >
              Protótipo
            </span>

            <h2 class="text-lg font-bold mt-1">
              {{ servicoSelecionado.botao }}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Fechar"
            class="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-[#FFF1EB] hover:text-[#D94E1E]"
            @click="fecharServico"
          >
            <span class="material-symbols-outlined">
              close
            </span>
          </button>
        </div>

        <div
          class="mt-4 p-3 rounded-xl bg-[#FFF1EB] flex items-center gap-3"
        >
          <img
            :src="servicoSelecionado.imagem"
            :alt="servicoSelecionado.nome"
            class="w-14 h-14 rounded-xl object-cover"
          />

          <div>
            <p class="font-bold text-sm">
              {{ servicoSelecionado.nome }}
            </p>

            <p class="text-xs text-slate-500 mt-0.5">
              {{ servicoSelecionado.profissao }}
            </p>
          </div>
        </div>

        <p class="text-sm text-slate-600 leading-relaxed mt-4">
          Esta interação é apenas demonstrativa. O projeto atualmente
          apresenta uma experiência visual de solicitação de serviço,
          sem realizar um agendamento ou contratação real.
        </p>

        <button
          type="button"
          class="w-full h-11 mt-5 rounded-xl bg-[#D94E1E] hover:bg-[#C34418] text-white font-bold transition"
          @click="fecharServico"
        >
          Entendi
        </button>
      </div>
    </div>
  </div>
</template>
