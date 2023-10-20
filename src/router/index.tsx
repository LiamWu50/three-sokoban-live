import { createHashRouter } from 'react-router-dom'

import Sokoban from '@/views/sokoban'

const router = createHashRouter([
  {
    path: '/',
    element: <Sokoban />
  }
])
export default router
