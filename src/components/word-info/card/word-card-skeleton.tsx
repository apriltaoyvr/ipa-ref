import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SkeletonCard() {
  return (
    <Card className='rounded-sm border-2'>
      <CardHeader className='mb-2'>
        <CardTitle className='mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight capitalize first:mt-0'>
          Loading
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-4 w-[18rem]  md:w-[25rem]' />
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <section className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-[14rem]' />
          <Skeleton className='h-4 w-[8rem]' />
        </section>
        <section className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-[14rem]' />
          <Skeleton className='h-4 w-[8rem]' />
        </section>
      </CardContent>
      <CardFooter className='flex flex-row gap-1 place-self-end'>
        <Skeleton className='h-4 w-[1rem]' />
        <Skeleton className='h-4 w-[1rem]' />
      </CardFooter>
    </Card>
  );
}
