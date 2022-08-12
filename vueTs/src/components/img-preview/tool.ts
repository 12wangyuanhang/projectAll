import bem from './bem.js';
const KEY_COMPONENT_NAME = 'avue-';
export default function(sfc:any) {
  sfc.name = KEY_COMPONENT_NAME + (sfc.name || '');
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(bem);
  return sfc;
}