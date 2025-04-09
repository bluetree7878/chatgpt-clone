interface FormMessageProps {
	message: string;
}

export default function FormMessage({ message }: FormMessageProps) {
	return <p className='text-sm text-red-600 ml-1 mt-1'>{message}</p>;
}
