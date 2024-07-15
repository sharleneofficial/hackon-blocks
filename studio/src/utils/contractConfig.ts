import { http, createConfig } from '@wagmi/core'
import { polygonZkEvmCardona } from '@wagmi/core/chains'

export const config = createConfig({
	chains: [polygonZkEvmCardona],
	transports: {
		[polygonZkEvmCardona.id]: http(),
	},
})
