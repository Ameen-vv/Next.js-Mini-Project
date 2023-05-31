import NavBar from '@components/NavBar'
import Provider from '@components/Provider'
import {Toaster} from 'react-hot-toast'
import '@styles/global.css'

export const metadata = {
    title:'Mini Project',
    description:'this is a mini project using react'
}
type childComponents = {
    children: React.ReactNode
}

const MainLayout : React.FC<childComponents> = ({children}) => {
  return (
    <html lang='en'>
        <body>
            
            <Provider>
            <Toaster/>    
            <div className="main">
                <div className="gradient"></div>
            </div>
            <main className='app'>
                <NavBar/>
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default MainLayout
