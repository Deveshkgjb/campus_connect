import UserInfo from "../components/UserInfo";

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-6 px-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">Your Profile</h1>
      <UserInfo />
    </div>
  );
}
