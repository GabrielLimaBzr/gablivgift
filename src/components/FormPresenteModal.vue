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
          <va-input v-model="form.estimatedPrice" label="Preço Estimado" placeholder="Insira o preço estimado" required
            class="w-full">
          </va-input>

        </div>

        <!-- Campo Categoria -->
        <div>
          <VaSelect v-model="catValue" :options="categories" label="Categoria" text-by="label" track-by="value"
            placeholder="Selecione uma categoria" required class="w-full" />
        </div>

        <!-- Campo Imagem -->
        <div class="col-span-2">
          <VaFileUpload dropZoneText="Arraste sua imagem para fazer upload ou" v-model="file" dropzone
            file-types="jpg,png" fileIncorrectMessage="O tipo de arquivo está incorreto" type="single"
            uploadButtonText="Carregar Imagem" />
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
          <va-button class="w-full" size="large" type="submit" color="primary" @click="prepareSave">
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

import axios from 'axios';
export default {
  data() {
    const categories = [
      { label: 'Eletrônicos', value: 1 },
      { label: 'Roupas', value: 2 },
      { label: 'Decoração', value: 3 },
      { label: 'Livros', value: 4 },
      { label: 'Jogos', value: 5 },
      { label: 'Utensílios Domésticos', value: 6 },
      { label: 'Viagens', value: 7 },
      { label: 'Experiências', value: 8 },
      { label: 'Outros', value: 9 },
      { label: 'Brinquedos', value: 10 },
    ];

    return {
      showModal: false,
      form: {
        title: '',
        description: '',
        image: null,
        estimatedPrice: '',
        category: 9,
        priority: false,
      },
      categories,
      savedItems: [],
      file: [],
      catValue: categories[8]
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
    test(valor) {
      console.log(valor);
      onsole.log(valor.target.value)
    },

    onConfirmed() {
      this.$emit('confirmed');
    },
    onCanceled() {
      this.$emit('canceled');
      this.resetForm();
    },

    saveState() {
      this.savedItems.push({ ...this.form });

      localStorage.setItem('formItems', JSON.stringify(this.savedItems));
      console.log(this.form);

      this.resetForm();

      this.$emit('confirmed', this.savedItems);

    },

    resetForm() {
      // Limpa os dados do formulário
      this.form = {
        title: '',
        description: '',
        image: '',
        estimatedPrice: '',
        category: '',
        priority: false,
      };
      this.file = []
    },

    clearSavedItems() {
      // Limpa a lista de itens salvos e o localStorage
      this.savedItems = [];
      localStorage.removeItem('formItems');
    },

    async saveForm() {
        this.form.category = this.catValue.value;
      this.saveState();
    },

    prepareFormData() {
      this.formData = new FormData();
      this.formData.append('file', this.file);
      this.formData.append('upload_preset', 'pre-gifts');
    },

    async prepareSave() {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileContents = reader.result;
        this.prepareFormData();
        axios
          .post(`https://api.cloudinary.com/v1_1/dv8vjjalo/upload`, this.formData)
          .then((response) => {
            this.results = response.data;
            console.log('public_id', this.results.public_id);
            this.form.image = this.results.secure_url;
            this.saveForm();
          })
          .catch((error) => { console.error('Error uploading image:', error); });
      };
      if (this.file && this.file.name) {
        reader.readAsDataURL(this.file);
      } else {
        this.saveForm();
      }
    },


  },
};
</script>
