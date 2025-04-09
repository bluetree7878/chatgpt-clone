import { Button, type ButtonProps } from '@/components/ui/button';

export default function Submit({ children, ...others }: ButtonProps) {
	return (
		<Button type='submit' {...others}>
			{children}
		</Button>
	);
}
