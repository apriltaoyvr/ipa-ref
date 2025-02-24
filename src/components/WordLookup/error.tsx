import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Word not found</CardTitle>
        <CardDescription>Perhaps you should try again</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{error.digest && error.digest}</p>
      </CardContent>
    </Card>
  );
}
