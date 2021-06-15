import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#957FEF',
            primaryAccent1: '#739793',
            primaryAccent2: '#FE5F55',
            primaryAccent3: '#E0D9FE',
            linen: '#32a852',
            linenDarker: '#C4BDAC',
            linenLighter: '#e1ded5',
            linenLighter2: '#514854',
            secondary:  '#B79CED',
            accent: '#DEC0F1',
            background: '#EFD9CE'
          },
        },
    }
});
