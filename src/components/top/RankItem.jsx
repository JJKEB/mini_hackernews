import useGetData from '../../lib/useGetData';

const UserItem = ({ userName, onUserAdd }) => {
  const [loading, resolved, error] = useGetData('user', userName, onUserAdd);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return null;
};

export default UserItem;
