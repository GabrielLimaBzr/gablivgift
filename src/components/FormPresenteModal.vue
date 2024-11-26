<template>
  <va-modal v-model="showModal" @ok="onConfirmed" @close="onCanceled" stateful close-button hideDefaultActions blur
    fixed-layout class="w-full" :mobileFullscreen="true">
    <div class="p-2">
      <h2 class="text-xl font-semibold mb-4 flex content-center">
        <VaIcon class="mr-2" name="redeem" size="1.5rem" /> Adicionar Presente
        
      </h2>
      
      <va-form ref="form" class="space-y-4 grid grid-cols-2 gap-4">
        <!-- Campo Título -->
        <div class="col-span-2">
          <va-input v-model="form.title" label="Título" placeholder="Digite o título do presente" required
            class="w-full" />
        </div>

        <!-- Campo Descrição -->
        <div class="col-span-2">
          <va-textarea v-model="form.description" label="Descrição" placeholder="Descreva o presente, inclua links etc."
            required rows="4" class="w-full" />
        </div>

        <!-- Campo Imagem -->
        <div class="col-span-2">
          <va-input v-model="form.image" label="Imagem (URL)" placeholder="Insira o link da imagem" type="url" required
            class="w-full" />
        </div>

        <!-- Campo Preço Estimado -->
        <div>
          <va-input v-model="form.estimatedPrice" label="Preço Estimado" placeholder="Insira o preço estimado"
            :mask="priceMask" required class="w-full" />
        </div>

        <!-- Campo Categoria -->
        <div>
          <va-select v-model="form.category" :options="categories" label="Categoria"
            placeholder="Selecione uma categoria" required class="w-full" />
        </div>

        <!-- Campo Prioridade -->
        <div class="flex items-center col-span-2">
          <VaSwitch off-color="#919191" v-model="form.priority" label="Marcar como prioridade"
            style="--va-switch-checker-background-color: #292929;" />
        </div>

        <!-- Botões de Ação -->
        <div class="flex justify-end space-x-3 col-start-2">
          <va-button type="button" color="secondary" @click="onCanceled" preset="secondary" hover-behavior="opacity"
            :hover-opacity="0.4">
            Cancelar
          </va-button>
          <va-button type="submit" color="primary">
            Salvar
          </va-button>
        </div>
      </va-form>
    </div>
  </va-modal>
</template>


<script>
export default {
  data() {
    return {
      showModal: false,
      form: {
        title: '',
        description: '',
        image: '',
        estimatedPrice: '',
        category: '',
        priority: false,
      },
      categories: [
        'Eletrônicos',
        'Roupas',
        'Decoração',
        'Livros',
        'Jogos',
        'Utensílios Domésticos',
        'Viagens',
        'Experiências',
        'Brinquedos',
        'Outros',
      ],
      priceMask: 'R$ #.##0,00',
    };
  },
  computed: {
    currentTab() {
      return this.tabs.find(({ title }) => title === this.tabIndex);
    },
  },
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isActive: function (newVal) {
      this.showModal = newVal;
    },
    showModal: function (newVal) {
      // Emitir eventos para o componente pai quando a modal for fechada
      if (!newVal) {
        this.$emit('canceled');
      }
    },
  },
  methods: {
    onConfirmed() {
      // Emitir evento para o componente pai quando a ação for confirmada
      this.$emit('confirmed');
    },
    onCanceled() {
      // Emitir evento para o componente pai quando a ação for cancelada
      this.$emit('canceled');
    }
  },
};
</script>

<style>

</style>