
import java.io.*;
import java.util.InputMismatchException;
import java.io.IOException;
import java.util.*;
class Solu {
    static StringBuffer str = new StringBuffer();
    static InputReader in = new InputReader(System.in);
    static int mm = 1000000007;
    static ArrayList<Integer> tree[];
    static int table[][];
    static int level[];
    static long  lici[];
    static int lg;
    static int down[];
    static boolean visited[];
    static long prefix[];
    //static TreeMap<Long,Long> last;
    static int inp[][];
    public static void dfsA(int x,int a){
        table[x][0]=a;
        for(int i=1;i<lg;i++){
            table[x][i]=table[table[x][i-1]][i-1];
        }
        level[x]++;
        visited[x]=true;
        for(Integer it:tree[x]){
            if(!visited[it]){
                level[it]=level[x];
                dfsA(it,x);
            }
        }
    }
    public static void dfspre(int x){
        visited[x]=true;
        for(Integer it:tree[x]){
            if(!visited[it]){
                dfspre(it);
                prefix[x]+=prefix[it];                
            }
        }
    }
    public static int dfsch(int x){
        if(lici[x]%2==0){
            //up[x]++;
            down[x]++;
        }
        visited[x]=true;
        for(Integer it:tree[x]){
            if(!visited[it]){
                    //up[it]=up[x];
                   down[x]+=dfsch(it);
            }
        }
        return down[x];
    }
    public static void main(String[] args) {
        int t, i, j, tt, n, m,it;
        n=in.nextInt();
        lg=(int)(Math.ceil(Math.log(n)/Math.log(2)));
        tree=new ArrayList[n];
        level=new int[n];
        lici=new long[n];
        //up=new int[n];
        visited=new boolean[n];
        down=new int[n];
        table=new int[n][lg];
        prefix=new long[n];
        inp=new int[n][2];
        //last=new TreeMap<>();
        for(i=0;i<n;i++){
            Arrays.fill(table[i], -1);
        }
        for(i=0;i<n;i++){
            tree[i]=new ArrayList<>();
        }
        for(i=0;i<n-1;i++){
            int l=in.nextInt()-1;
            int r=in.nextInt()-1;
            inp[i][0]=Math.min(l, r);
            inp[i][1]=Math.max(l, r);
            tree[l].add(r);
            tree[r].add(l);
        }
        for(i=0;i<n;i++){
            long l=in.nextLong();
            lici[i]=l;
        }
        dfsA(0,0);
        for(i=0;i<n;i++){
            long l=in.nextInt();
            l=l%level[i];
            long y=in.nextLong();
            if(l==0)
                continue;
            int vv=i;
            for(j=lg-1;j>=0;j--){
                long pp=po(2, j);
                if(pp>l)
                    continue;
                l=l-pp;
                vv=table[vv][j];
                if(l<=0)
                    break;
            }
            prefix[table[i][0]]+=y;
            if(vv!=0)
                prefix[table[vv][0]]-=y;
        }
        Arrays.fill(visited,false);
        dfspre(0);
        for(i=0;i<n;i++){
            lici[i]+=prefix[i];
        }
        Arrays.fill(visited,false);
        dfsch(0);
        for(i=0;i<n-1;i++){
            if(level[inp[i][0]]<level[inp[i][1]]){
                long h=down[0]-down[inp[i][1]];
                long g=down[inp[i][1]];
                ap(h*g*2+" ");
            }else{
                long h=down[0]-down[inp[i][0]];
                long g=down[inp[i][0]];
                ap(h*g*2+" ");
            }
        }
        pn();
    }

    static long gcd(long a, long b) {
        return (b == 0) ? a : gcd(b, a % b);
    }

    static int gcdi(int a, int b) {
        return (b == 0) ? a : gcdi(b, a % b);
    }
    
    static long power(int x, int y, int m) {
        if (y == 0) {
            return 1;
        }
        long p = power(x, y / 2, m) % m;
        p = (p * p) % m;
        return (y % 2 == 0) ? p : (x * p) % m;
    }
    static long po(int x, int y) {
        if (y == 0) {
            return 1;
        }
        long p = po(x, y / 2);
        p = (p * p);
        return (y % 2 == 0) ? p : (x * p);
    }
    public static void ap(String st) {
        str.append(st);
    }

    public static void pn() {
        System.out.println(str);
    }
    public static void pnt(String st) {
        System.out.println(st);
    }
    static class InputReader {

        private InputStream stream;
        private byte[] buf = new byte[1024];
        private int curChar;
        private int numChars;

        public InputReader(InputStream stream) {
            this.stream = stream;
        }

        public int read() {
            if (numChars == -1) {
                throw new UnknownError();
            }
            if (curChar >= numChars) {
                curChar = 0;
                try {
                    numChars = stream.read(buf);
                } catch (IOException e) {
                    throw new UnknownError();
                }
                if (numChars <= 0) {
                    return -1;
                }
            }
            return buf[curChar++];
        }

        public int peek() {
            if (numChars == -1) {
                return -1;
            }
            if (curChar >= numChars) {
                curChar = 0;
                try {
                    numChars = stream.read(buf);
                } catch (IOException e) {
                    return -1;
                }
                if (numChars <= 0) {
                    return -1;
                }
            }
            return buf[curChar];
        }

        public void skip(int x) {
            while (x-- > 0) {
                read();
            }
        }

        public int nextInt() {
            return Integer.parseInt(next());
        }

        public long nextLong() {
            return Long.parseLong(next());
        }

        public String nextString() {
            return next();
        }

        public String next() {
            int c = read();
            while (isSpaceChar(c)) {
                c = read();
            }
            StringBuffer res = new StringBuffer();
            do {
                res.appendCodePoint(c);
                c = read();
            } while (!isSpaceChar(c));

            return res.toString();
        }

        public String nextLine() {
            StringBuffer buf = new StringBuffer();
            int c = read();
            while (c != '\n' && c != -1) {
                if (c != '\r') {
                    buf.appendCodePoint(c);
                }
                c = read();
            }
            return buf.toString();
        }

        public double nextDouble() {
            int c = read();
            while (isSpaceChar(c)) {
                c = read();
            }
            int sgn = 1;
            if (c == '-') {
                sgn = -1;
                c = read();
            }
            double res = 0;
            while (!isSpaceChar(c) && c != '.') {
                if (c == 'e' || c == 'E') {
                    return res * Math.pow(10, nextInt());
                }
                if (c < '0' || c > '9') {
                    throw new InputMismatchException();
                }
                res *= 10;
                res += c - '0';
                c = read();
            }
            if (c == '.') {
                c = read();
                double m = 1;
                while (!isSpaceChar(c)) {
                    if (c == 'e' || c == 'E') {
                        return res * Math.pow(10, nextInt());
                    }
                    if (c < '0' || c > '9') {
                        throw new InputMismatchException();
                    }
                    m /= 10;
                    res += (c - '0') * m;
                    c = read();
                }
            }
            return res * sgn;
        }

        public boolean hasNext() {
            int value;
            while (isSpaceChar(value = peek()) && value != -1) {
                read();
            }
            return value != -1;
        }

        private boolean isSpaceChar(int c) {
            return c == ' ' || c == '\n' || c == '\r' || c == '\t' || c == -1;
        }
    }
}
