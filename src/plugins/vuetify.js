import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#FF8BA9', 
            primaryAccent1: '#A00040', // wrong answer
            primaryAccent2: '#FE5F55',
            primaryAccent3: '#EFD9CE',
            linen: '#32a852', //correct answer 
            linenDarker: '#C4BDAC',
            linenLighter: '#e1ded5',
            linenLighter2: '#514854',
            secondary:  '#D07EAF',
            accent: '#F7E6F1',
            background: '#FFF3F8'
          },
        },
    }
});
