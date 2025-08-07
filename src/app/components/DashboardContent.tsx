'use client';

// Dashboard cards component
const Card = ({ title, value, icon }: { title: string; value: string; icon: string }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
          <span className="text-white text-xl">{icon}</span>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd className="text-lg font-semibold text-gray-900">{value}</dd>
        </div>
      </div>
    </div>
  </div>
);

// Activity item component
const ActivityItem = ({ id }: { id: number }) => (
  <li className="px-4 py-4 sm:px-6">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-indigo-600 truncate">
        Activity {id}
      </p>
      <div className="ml-2 flex-shrink-0 flex">
        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Completed
        </p>
      </div>
    </div>
    <div className="mt-2 sm:flex sm:justify-between">
      <div className="sm:flex">
        <p className="text-sm text-gray-500">
          This is a dummy activity item for demonstration purposes.
        </p>
      </div>
      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
        <p>
          <time dateTime="2023-01-01">Just now</time>
        </p>
      </div>
    </div>
  </li>
);

export default function DashboardContent() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin!</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Total Users" value="125" icon="👥" />
            <Card title="Revenue" value="$5,432" icon="💰" />
            <Card title="Tasks" value="42" icon="✅" />
            <Card title="Pending" value="7" icon="⏳" />
          </div>

          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activity
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <ActivityItem key={item} id={item} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
