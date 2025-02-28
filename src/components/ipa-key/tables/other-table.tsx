import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';

export function OtherTable() {
  return (
    <Table>
      <TableCaption>A list of marginal segments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Example</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <strong>x</strong>
          </TableCell>
          <TableCell>
            u<strong>gh</strong>, lo<strong>ch</strong>, <strong>Ch</strong>
            anukah
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>ʔ</strong>
          </TableCell>
          <TableCell>
            u<strong>h</strong>-oh /ˈʔʌʔoʊ/
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>ɒ̃</strong>
          </TableCell>
          <TableCell>
            b<strong>on</strong> vivant
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>æ̃</strong>
          </TableCell>
          <TableCell>
            f<strong>in</strong> de siècle
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>ɜː</strong>
          </TableCell>
          <TableCell>
            M<strong>ö</strong>bius (UK only)
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
