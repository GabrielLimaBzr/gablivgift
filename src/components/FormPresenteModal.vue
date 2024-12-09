<template>
  <va-modal v-model="showModal" @ok="onConfirmed" @close="onCanceled" stateful close-button hideDefaultActions blur
    fixed-layout class="w-full" :mobileFullscreen="false">
    <div class="p-2">
      <h2 class="text-xl font-semibold mb-4 flex content-center">
        <VaIcon class="mr-2" name="redeem" size="1.5rem" /> Adicionar Presente

      </h2>

      <va-form ref="form" class="space-y-4 grid grid-cols-2 gap-4">
        <!-- Campo Título -->
        <div class="col-span-2">
          <va-input v-model="form.title" label="Título" placeholder="Digite o título do presente" required
            class="w-full" :rules="[(v) => v.length > 3 || `Coloque um título`]" />
        </div>

        <!-- Campo Descrição -->
        <div class="col-span-2">
          <va-textarea max-length="100" v-model="form.description" label="Descrição"
            placeholder="Descreva o presente, inclua links etc." required rows="4" class="w-full" required-mark :rules="[
              (v) => v && v.length > 0 || 'Coloque alguma descrição',
              (v) => v && v.length < 100,
            ]" />
        </div>

        <!-- Campo Preço Estimado -->
        <div>
          <va-input v-model="form.estimatedPrice" label="Preço Estimado" placeholder="Insira o preço estimado"
            required class="w-full">
          </va-input>

        </div>

        <!-- Campo Categoria -->
        <div>
          <va-select v-model="form.category" :options="categories" label="Categoria"
            placeholder="Selecione uma categoria" required class="w-full" />
        </div>

        <!-- Campo Imagem -->
        <div class="col-span-2">
          <VaFileUpload 
            dropZoneText="Arraste sua imagem para fazer upload ou" 
            v-model="form.image" 
            dropzone 
            file-types="jpg,png" 
            fileIncorrectMessage="O tipo de arquivo está incorreto"
            type="single"
            uploadButtonText="Carregar Imagem"/>
        </div>

        <!-- Campo Prioridade -->
        <div class="flex items-center col-span-2">
          <VaSwitch off-color="#919191" v-model="form.priority" label="Marcar como prioridade 🔥"
            style="--va-switch-checker-background-color: #292929;" />
        </div>

        <!-- Botões de Ação -->
        <div class="flex justify-end space-x-3 col-span-2">
          <va-button class="w-full" size="large" type="button" color="secondary" @click="onCanceled" preset="secondary"
            hover-behavior="opacity" :hover-opacity="0.4">
            Cancelar
          </va-button>
          <va-button class="w-full" size="large" type="submit" color="primary" @click="saveForm">
            Salvar
          </va-button>
        </div>
      </va-form>
    </div>
  </va-modal>
</template>

<style>
.va-message-list__message {
  color: var(--va-secondary) !important;
}
</style>

<script>

export default {
  data() {
    return {
      showModal: false,
      form: {
        title: '',
        description: '',
        image: {},
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
      savedItems: [],
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
      if (!newVal) {
        this.$emit('canceled');
      }
    },
  },
  methods: {
    onConfirmed() {
      this.$emit('confirmed');
    },
    onCanceled() {
      this.$emit('canceled');
      this.resetForm();
    },

    saveForm() {
      this.savedItems.push({ ...this.form });

      localStorage.setItem('formItems', JSON.stringify(this.savedItems));
      console.log(this.form);

      // Limpar o formulário para um novo item
      this.resetForm();

      
      

      // Emitir evento para notificar o componente pai
      this.$emit('confirmed', this.savedItems);

    },

    resetForm() {
      // Limpa os dados do formulário
      this.form = {
        title: '',
        description: '',
        image: {},
        estimatedPrice: '',
        category: '',
        priority: false,
      };
    },

    clearSavedItems() {
      // Limpa a lista de itens salvos e o localStorage
      this.savedItems = [];
      localStorage.removeItem('formItems');
    },
  },
};
</script>
