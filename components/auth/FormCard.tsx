import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

interface FormCardProps {
  title: string;
  footer: { label: string; href: string };
  children: React.ReactNode;
}

export default function FormCard({ title, footer, children }: FormCardProps) {
  return (
    <Card className="w-[500px] flex flex-col items-center border">
      <CardHeader className="text-center w-full">
        <CardTitle className="text-2xl tracking-tight font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-[90%]">{children}</CardContent>
      <CardFooter>
        <Link href={footer.href} className="text-sm text-sky-700">
          {footer.label}
        </Link>
      </CardFooter>
    </Card>
  );
}
