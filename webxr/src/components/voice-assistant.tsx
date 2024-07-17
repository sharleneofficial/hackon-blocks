'use client'
import { useEffect, useState } from 'react'
import { Mic, MicOff } from 'lucide-react'
import ChatCompletionCreateParams, { OpenAI } from 'openai'

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
})

export const VoiceAssistant = ({ productInfo, brandName }: any) => {
	const [isListening, setIsListening] = useState(false)
	const [transcript, setTranscript] = useState('')
	const [response, setResponse] = useState('')
	const [messages, setMessages] = useState([
		{
			role: 'system',
			content: `
      you are a brand and products spokesperson for ${brandName}, use this to answer questions "${productInfo}". Respond to inquiries with clear, concise answers under 20 words, use information shared only.`,
		},
	])
	const [gender, setGender] = useState('female')

	useEffect(() => {
		const recognition = new (window as any).webkitSpeechRecognition()
		recognition.continuous = false
		recognition.interimResults = false
		recognition.lang = 'en-US'

		recognition.onresult = (event: any) => {
			const speechToText = event.results[0][0].transcript
			// console.log(speechToText)
			setTranscript(speechToText)
			addMessage({ role: 'user', content: speechToText })
			getOpenAIResponse(speechToText)
		}

		recognition.onerror = (event: any) => {
			// console.error('Speech recognition error', event)
			setIsListening(false)
		}

		recognition.onend = () => {
			setIsListening(false)
		}

		if (isListening) {
			recognition.start()
		} else {
			recognition.stop()
		}

		return () => {
			recognition.stop()
		}
	}, [isListening])

	const getOpenAIResponse = async (text: string) => {
		try {
			const newMessages = [...messages, { role: 'user', content: text }]
			const params: ChatCompletionCreateParams = {
				//@ts-ignore
				model: 'gpt-3.5-turbo',
				messages: newMessages.map((msg) => ({
					role: msg.role as 'user' | 'assistant' | 'system',
					content: msg.content,
				})),
				max_tokens: 50,
				temperature: 0.2,
			}

			//@ts-ignore
			const response = await openai.chat.completions.create(params)
			const aiResponse = response.choices?.[0]?.message?.content?.trim()
			if (aiResponse) {
				setResponse(aiResponse)
				setMessages((prevMessages) => [
					...prevMessages,
					{ role: 'assistant', content: aiResponse },
				])
				speak(aiResponse)
			} else {
				console.error('Received an invalid response from OpenAI')
			}
		} catch (error) {
			console.error('Error fetching OpenAI response:', error)
		}
	}

	const addMessage = (message: {
		role: 'user' | 'assistant'
		content: string
	}) => {
		setMessages((prevMessages) => [...prevMessages, message])
	}

	const speak = (text: string) => {
		const synth = window.speechSynthesis
		const utterance = new SpeechSynthesisUtterance(text)

		const voices = synth.getVoices()
		const selectedVoice = voices.find(
			(voice) =>
				(gender === 'female' && /female/i.test(voice.name)) ||
				(gender === 'male' && /male/i.test(voice.name))
		)

		if (selectedVoice) {
			utterance.voice = selectedVoice
		} else if (voices.length > 0) {
			// Fallback to the first voice if no matching gender voice is found
			utterance.voice = voices[0]
		}

		synth.speak(utterance)
	}

	const handleListen = () => {
		setIsListening((prevState) => !prevState)
	}

	// console.log(productInfo)

	return (
		<div className='flex flex-col justify-center items-center text-center'>
			{transcript && (
				<div className='mb-4 bg-black text-white p-4 rounded-md w-3/4'>
					<p>User: &nbsp;{transcript}</p>
				</div>
			)}
			{response && (
				<div className='mb-4 bg-black text-white p-4 rounded-md w-3/4'>
					<p>Assistant: &nbsp;{response}</p>
				</div>
			)}
			<div>
				<button
					onClick={handleListen}
					className='cursor-pointer border-2 border-white bg-black mx-auto flex item-center gap-4 justify-center bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-full px-8 py-2'
				>
					{isListening ? <Mic /> : <MicOff />}
				</button>
				<p>Click on the icon to speak with the avatar</p>
			</div>
		</div>
	)
}
