import { registerRootComponent } from 'expo';
import App from './App';

// Esta função registra o componente principal no ambiente nativo do Expo.
registerRootComponent(App);

// ADICIONE ESTA LINHA ABAIXO:
// Ela garante que o Metro encontre uma exportação padrão para renderizar, 
// eliminando o erro de "No default export".
export default App;