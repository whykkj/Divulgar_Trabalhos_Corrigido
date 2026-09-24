<script setup>
import { informar, focarBusca, subirPagina, normalizarTexto } from '../utils/interface'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const subcategoriaAtiva = ref('Todas')
const filtroAtivo = ref('')
const favoritos = ref([])
const somenteFavoritos = ref(false)
const mostrarFiltros = ref(false)
const servicoSelecionado = ref(null)

const subcategorias = [
  { nome: 'Todas', icone: 'event' },
  { nome: 'Casamentos', icone: 'favorite' },
  { nome: 'Aniversários', icone: 'cake' },
  { nome: 'Formaturas', icone: 'school' },
  { nome: 'Eventos Corporativos', icone: 'business_center' },
  { nome: 'Festas', icone: 'celebration' },
  { nome: 'Cerimônias', icone: 'church' }
]

const filtros = [
  { nome: 'Disponível hoje', icone: 'today' },
  { nome: 'Atendimento no local', icone: 'location_on' },
  { nome: 'Melhores notas', icone: 'star' }
]

const profissionais = [
  {
    id: 1,
    nome: 'Celebrare Eventos',
    profissao: 'Organização e Cerimonial de Casamentos',
    categoria: 'Casamentos',
    avaliacao: 4.9,
    avaliacoes: 126,
    bairro: 'Nazaré',
    distancia: '1,8 km',
    disponibilidade: 'Disponível hoje',
    atendimentoLocal: true,
    destaque: 'Cerimonial completo',
    observacao: 'Atendimento personalizado',
    imagem: 'https://i.pravatar.cc/150?img=12',
    especialidades: ['Cerimonial', 'Decoração', 'Casamentos']
  },
  {
    id: 2,
    nome: 'Festa & Encanto',
    profissao: 'Decoração e Organização de Aniversários',
    categoria: 'Aniversários',
    avaliacao: 4.8,
    avaliacoes: 94,
    bairro: 'Marco',
    distancia: '2,4 km',
    disponibilidade: 'Disponível hoje',
    atendimentoLocal: true,
    destaque: 'Decoração personalizada',
    observacao: 'Montagem completa',
    imagem: 'https://i.pravatar.cc/150?img=32',
    especialidades: ['Decoração', 'Aniversários', 'Buffet']
  },
  {
    id: 3,
    nome: 'Formar Produções',
    profissao: 'Produção de Formaturas e Eventos',
    categoria: 'Formaturas',
    avaliacao: 5.0,
    avaliacoes: 78,
    bairro: 'São Brás',
    distancia: '3,1 km',
    disponibilidade: 'Agendamento necessário',
    atendimentoLocal: true,
    destaque: 'Produção de formaturas',
    observacao: 'Equipe especializada',
    imagem: 'https://i.pravatar.cc/150?img=11',
    especialidades: ['Formaturas', 'Produção', 'Cerimonial']
  },
  {
    id: 4,
    nome: 'Prime Corporate Eventos',
    profissao: 'Eventos Corporativos e Empresariais',
    categoria: 'Eventos Corporativos',
    avaliacao: 4.7,
    avaliacoes: 61,
    bairro: 'Umarizal',
    distancia: '3,7 km',
    disponibilidade: 'Presencial',
    atendimentoLocal: true,
    destaque: 'Eventos empresariais',
    observacao: 'Planejamento completo',
    imagem: 'https://i.pravatar.cc/150?img=13',
    especialidades: ['Corporativo', 'Confraternizações', 'Produção']
  },
  {
    id: 5,
    nome: 'Momentos & Festas',
    profissao: 'Produção e Decoração de Festas',
    categoria: 'Festas',
    avaliacao: 4.9,
    avaliacoes: 83,
    bairro: 'Pedreira',
    distancia: '4,2 km',
    disponibilidade: 'Disponível hoje',
    atendimentoLocal: true,
    destaque: 'Festas personalizadas',
    observacao: 'Decoração e produção',
    imagem: 'https://i.pravatar.cc/150?img=47',
    especialidades: ['Festas', 'Decoração', 'Produção']
  }
]

const profissionaisFiltrados = computed(() => {
  let resultado = [...profissionais]

  if (busca.value.trim()) {
    const termo = normalizarTexto(busca.value)

    resultado = resultado.filter((profissional) =>
      [
        profissional.nome,
        profissional.profissao,
        profissional.categoria,
        profissional.bairro,
        profissional.destaque,
        ...profissional.especialidades
      ]
        .join(' ')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .includes(termo)
    )
  }

  if (subcategoriaAtiva.value !== 'Todas') {
    resultado = resultado.filter(
      (profissional) =>
        profissional.categoria === subcategoriaAtiva.value
    )
  }

  if (filtroAtivo.value === 'Disponível hoje') {
    resultado = resultado.filter((profissional) =>
      profissional.disponibilidade.toLowerCase().includes('hoje')
    )
  }

  if (filtroAtivo.value === 'Atendimento no local') {
    resultado = resultado.filter(
      (profissional) => profissional.atendimentoLocal
    )
  }

  if (filtroAtivo.value === 'Melhores notas') {
    resultado = resultado.filter(
      (profissional) => profissional.avaliacao >= 4.9
    )
  }

  if (somenteFavoritos.value) resultado = resultado.filter(p => favoritos.value.includes(p.id))
  return resultado
})

function voltar() {
  router.push('/')
}

function alternarFavorito(id) {
  if (favoritos.value.includes(id)) {
    favoritos.value = favoritos.value.filter((item) => item !== id)
  } else {
    favoritos.value.push(id)
  }
}

function selecionarFiltro(filtro) {
  filtroAtivo.value =
    filtroAtivo.value === filtro ? '' : filtro
}

function abrirServico(profissional) {
  servicoSelecionado.value = profissional
}

function fecharModal() {
  servicoSelecionado.value = null
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">

    <!-- HEADER -->
    <header class="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-slate-200">
      <div class="max-w-[1100px] mx-auto h-full px-4 flex items-center justify-between">

        <div class="flex items-center gap-3 min-w-0">
          <button
            @click="voltar"
            class="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100"
          >
            <span class="material-symbols-outlined text-[21px]">
              arrow_back
            </span>
          </button>

          <div class="min-w-0">
            <h1 class="font-bold text-[16px] truncate">
              Eventos
            </h1>
            <p class="text-[11px] text-slate-500 truncate">
              Profissionais para seu evento
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button @click="informar('Não há notificações nesta demonstração.')"
            class="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100"
          >
            <span class="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>

          <button @click="router.push('/login')"
            class="w-9 h-9 rounded-xl bg-[#FFF1EB] text-[#D94E1E] flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-[20px]">
              person
            </span>
          </button>
        </div>

      </div>
    </header>

    <!-- CONTEÚDO -->
    <main class="pt-20 pb-24 px-4">
      <div class="max-w-[850px] mx-auto flex flex-col gap-4">

        <!-- APRESENTAÇÃO -->
        <section class="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200">

          <div class="flex items-center gap-3">

            <div
              class="w-12 h-12 rounded-2xl bg-[#FFF1EB] text-[#D94E1E] flex items-center justify-center shrink-0"
            >
              <span class="material-symbols-outlined text-[25px]">
                event
              </span>
            </div>

            <div class="min-w-0">
              <h2 class="font-bold text-[16px]">
                Encontre profissionais para eventos
              </h2>

              <p class="text-[12px] text-slate-500 mt-0.5">
                Compare serviços e encontre quem combina com seu evento.
              </p>
            </div>

          </div>

          <!-- BUSCA -->
          <div class="mt-4 flex gap-2">

            <div class="relative flex-1">
              <span
                class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400"
              >
                search
              </span>

              <input
                v-model="busca"
                type="text"
                placeholder="Buscar profissional ou serviço..."
                class="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-[13px] outline-none focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/10"
              />
            </div>

            <button
              @click="mostrarFiltros = !mostrarFiltros"
              class="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50"
            >
              <span class="material-symbols-outlined text-[20px]">
                tune
              </span>
            </button>

          </div>

          <!-- FILTROS -->
          <div
            v-if="mostrarFiltros"
            class="mt-3 rounded-xl bg-[#FFF7F3] border border-[#F9D8C8] p-3"
          >
            <div class="flex flex-wrap gap-2">

              <button
                v-for="filtro in filtros"
                :key="filtro.nome"
                @click="selecionarFiltro(filtro.nome)"
                :class="[
                  'px-3 py-2 rounded-lg text-[12px] font-medium flex items-center gap-1.5 border transition',
                  filtroAtivo === filtro.nome
                    ? 'bg-[#D94E1E] text-white border-[#D94E1E]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#D94E1E]'
                ]"
              >
                <span class="material-symbols-outlined text-[17px]">
                  {{ filtro.icone }}
                </span>

                {{ filtro.nome }}
              </button>

            </div>
          </div>

        </section>

        <!-- CATEGORIAS -->
        <section class="overflow-x-auto -mx-1 px-1">
          <div class="flex gap-2 min-w-max">

            <button
              v-for="categoria in subcategorias"
              :key="categoria.nome"
              @click="subcategoriaAtiva = categoria.nome"
              :class="[
                'h-9 px-3 rounded-xl flex items-center gap-1.5 text-[12px] font-medium border transition',
                subcategoriaAtiva === categoria.nome
                  ? 'bg-[#D94E1E] text-white border-[#D94E1E]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#D94E1E]'
              ]"
            >
              <span class="material-symbols-outlined text-[17px]">
                {{ categoria.icone }}
              </span>

              {{ categoria.nome }}
            </button>

          </div>
        </section>

        <!-- LOCALIZAÇÃO / RESULTADOS -->
        <div class="flex items-center justify-between gap-3">

          <div class="flex items-center gap-1.5 text-[12px] text-slate-500">
            <span class="material-symbols-outlined text-[17px]">
              location_on
            </span>

            <span>Belém e região</span>
          </div>

          <span class="text-[12px] font-medium text-slate-500">
            {{ profissionaisFiltrados.length }}
            profissionais
          </span>

        </div>

        <!-- BANNER -->
        <section
          class="rounded-2xl p-4 bg-linear-to-r from-[#D94E1E] to-[#F27A4B] text-white shadow-sm"
        >
          <div class="flex items-center gap-3">

            <div
              class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0"
            >
              <span class="material-symbols-outlined text-[22px]">
                celebration
              </span>
            </div>

            <div>
              <h3 class="font-bold text-[15px]">
                Planejando um evento?
              </h3>

              <p class="text-[11px] text-white/85 mt-0.5">
                Encontre profissionais para cuidar de cada detalhe.
              </p>
            </div>

          </div>
        </section>

        <!-- CARDS -->
        <section class="flex flex-col gap-3">

          <article
            v-for="profissional in profissionaisFiltrados"
            :key="profissional.id"
            class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm"
          >

            <div class="flex gap-3">

              <!-- FOTO -->
              <div class="relative shrink-0">

                <img
                  :src="profissional.imagem"
                  :alt="profissional.nome"
                  class="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl object-cover"
                />

                <span
                  class="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"
                ></span>

              </div>

              <!-- INFORMAÇÕES -->
              <div class="flex-1 min-w-0">

                <div class="flex items-start justify-between gap-2">

                  <div class="min-w-0">
                    <h3 class="font-bold text-[14px] truncate">
                      {{ profissional.nome }}
                    </h3>

                    <p class="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                      {{ profissional.profissao }}
                    </p>
                  </div>

                  <button
                    @click="alternarFavorito(profissional.id)"
                    class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 shrink-0"
                  >
                    <span
                      :class="[
                        'material-symbols-outlined text-[20px]',
                        favoritos.includes(profissional.id)
                          ? 'text-red-500'
                          : 'text-slate-400'
                      ]"
                    >
                      {{ favoritos.includes(profissional.id) ? 'favorite' : 'favorite_border' }}
                    </span>
                  </button>

                </div>

                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">

                  <span class="flex items-center gap-1 text-[11px]">
                    <span class="material-symbols-outlined text-[15px] text-amber-500">
                      star
                    </span>
                    <b>{{ profissional.avaliacao }}</b>
                    <span class="text-slate-400">
                      ({{ profissional.avaliacoes }})
                    </span>
                  </span>

                  <span class="flex items-center gap-1 text-[11px] text-slate-500">
                    <span class="material-symbols-outlined text-[15px]">
                      location_on
                    </span>
                    {{ profissional.bairro }} · {{ profissional.distancia }}
                  </span>

                </div>

                <div class="flex flex-wrap gap-1.5 mt-2">

                  <span
                    v-for="especialidade in profissional.especialidades"
                    :key="especialidade"
                    class="px-2 py-1 rounded-lg bg-slate-100 text-[10px] text-slate-600"
                  >
                    {{ especialidade }}
                  </span>

                </div>

              </div>

            </div>

            <!-- RODAPÉ DO CARD -->
            <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">

              <span
                class="text-[11px] font-medium"
                :class="
                  profissional.disponibilidade.includes('hoje')
                    ? 'text-emerald-600'
                    : 'text-slate-500'
                "
              >
                {{ profissional.disponibilidade }}
              </span>

              <div class="flex gap-2">

                <button
                  @click="abrirServico(profissional)"
                  class="h-9 px-3 rounded-xl bg-[#D94E1E] text-white text-[11px] font-semibold hover:bg-[#C94418] transition"
                >
                  Ver perfil
                </button>

                <button
                  @click="abrirServico(profissional)"
                  class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                >
                  <span class="material-symbols-outlined text-[18px]">
                    chat
                  </span>
                </button>

              </div>

            </div>

          </article>

          <!-- SEM RESULTADOS -->
          <div
            v-if="profissionaisFiltrados.length === 0"
            class="bg-white rounded-2xl p-8 text-center border border-slate-200"
          >
            <span class="material-symbols-outlined text-[38px] text-slate-300">
              search_off
            </span>

            <h3 class="font-bold text-[14px] mt-2">
              Nenhum profissional encontrado
            </h3>

            <p class="text-[12px] text-slate-500 mt-1">
              Tente mudar sua busca ou remover alguns filtros.
            </p>
          </div>

        </section>

        <!-- INFORMAÇÃO -->
        <section class="bg-white rounded-2xl p-4 border border-slate-200">

          <div class="flex gap-3">

            <span class="material-symbols-outlined text-[#D94E1E] text-[22px]">
              info
            </span>

            <div>
              <h3 class="font-bold text-[13px]">
                Encontre profissionais para seu evento
              </h3>

              <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Explore os profissionais disponíveis, confira suas especialidades
                e escolha quem atende melhor às necessidades do seu evento.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>

    <!-- MENU INFERIOR -->
    <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200">
      <div class="max-w-[850px] mx-auto h-16 flex items-center justify-around">

        <button
          @click="router.push('/')"
          class="flex flex-col items-center gap-0.5 text-slate-500"
        >
          <span class="material-symbols-outlined text-[21px]">
            home
          </span>
          <span class="text-[10px]">
            Início
          </span>
        </button>

        <button @click="subirPagina"
          class="flex flex-col items-center gap-0.5 text-[#D94E1E]"
        >
          <span class="material-symbols-outlined text-[21px]">
            event
          </span>
          <span class="text-[10px] font-medium">
            Eventos
          </span>
        </button>

        <button @click="somenteFavoritos = !somenteFavoritos"
          class="flex flex-col items-center gap-0.5 text-slate-500"
        >
          <span class="material-symbols-outlined text-[21px]">
            favorite
          </span>
          <span class="text-[10px]">
            {{ somenteFavoritos ? 'Ver todos' : 'Favoritos' }}
          </span>
        </button>

        <button @click="informar('As mensagens ainda não estão disponíveis nesta demonstração.')"
          class="flex flex-col items-center gap-0.5 text-slate-500"
        >
          <span class="material-symbols-outlined text-[21px]">
            chat
          </span>
          <span class="text-[10px]">
            Mensagens
          </span>
        </button>

        <button @click="router.push('/login')"
          class="flex flex-col items-center gap-0.5 text-slate-500"
        >
          <span class="material-symbols-outlined text-[21px]">
            person
          </span>
          <span class="text-[10px]">
            Perfil
          </span>
        </button>

      </div>
    </nav>

    <!-- MODAL -->
    <div
      v-if="servicoSelecionado"
      class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      @click.self="fecharModal"
    >

      <div class="w-full max-w-md bg-white rounded-2xl p-5 shadow-xl">

        <div class="flex items-center justify-between">

          <div>
            <h3 class="font-bold text-[16px]">
              {{ servicoSelecionado.nome }}
            </h3>

            <p class="text-[11px] text-slate-500 mt-1">
              {{ servicoSelecionado.profissao }}
            </p>
          </div>

          <button
            @click="fecharModal"
            class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
          >
            <span class="material-symbols-outlined text-[20px]">
              close
            </span>
          </button>

        </div>

        <div class="mt-4 p-3 rounded-xl bg-[#FFF7F3]">
          <p class="text-[12px] text-slate-600">
            Este é um perfil demonstrativo do protótipo.
          </p>
        </div>

        <button
          @click="fecharModal"
          class="w-full h-10 mt-4 rounded-xl bg-[#D94E1E] text-white text-[12px] font-semibold"
        >
          Fechar
        </button>

      </div>

    </div>

  </div>
</template>
