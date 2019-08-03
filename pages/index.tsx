import { NextPage } from 'next';
import FixedAddButton from '../components/FixedAddButton';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <div>
        <p>HelloWorld! - user agent: {userAgent}</p>
        <FixedAddButton />
    </div>
)

Home.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
    return { userAgent };
};

export default Home;
