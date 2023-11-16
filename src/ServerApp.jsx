import { renderToPipeableStream} from 'react-dom/server'
import { StaticRouter} from 'react-router-dom/server'
import App from './App'

export default function render(url, opts){
    const stream  = renderToPipeableStream(
        <StaticRouter>
            <App/>
        </StaticRouter>,
        opts
    )

    return stream;
}