import {ThemeProvider, theme, Box} from '@primer/react'
import deepmerge from 'deepmerge'

import { Container } from './components/container';

const customTheme = deepmerge(theme, {
	colorSchemes: {
		light: {
			colors: {
				border: {
					default: '#D3D9E2'
				}
			}
		}
	}
})

function App() {
	return (
		<ThemeProvider theme={customTheme}>
			<Box>
				<Container></Container>
			</Box>
		</ThemeProvider>
	)
}
export default App;
