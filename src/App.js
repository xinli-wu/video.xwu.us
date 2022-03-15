import { Box } from '@chakra-ui/react';
import './App.css';
import Video from './components/Video';

function App() {
  return (
    <div className='App'>
      <Box bg='grey' w='100%' h='100vh' p={4} color='white'>
        <Video />
      </Box>
    </div>
  );
}

export default App;
