// components/Dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  ClockIcon,
  UserIcon,
  DocumentArrowUpIcon,
  ArrowRightIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('1M');
  const [activeTab, setActiveTab] = useState('overview');

  // Simulated paper money balance
  const [paperMoneyBalance, setPaperMoneyBalance] = useState(5000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountRes, transactionsRes] = await Promise.all([
          axios.get('/api/accounts/myaccount'),
          axios.get('/api/transactions/recent')
        ]);
        setAccount(accountRes.data);
        setTransactions(transactionsRes.data.transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigation = (path) => {
    router.push(`/dashboard/${path}`);
  };

  const handlePaperMoneyTransfer = async (amount) => {
    try {
      await axios.post('/api/transactions/paper-money', { amount });
      setPaperMoneyBalance(prev => prev - amount);
      // Update main balance
      setAccount(prev => ({ ...prev, balance: prev.balance + amount }));
    } catch (error) {
      console.error('Paper money transfer failed:', error);
    }
  };

  const financialStats = transactions.reduce((acc, transaction) => {
    acc[transaction.type] = (acc[transaction.type] || 0) + transaction.amount;
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="animate-pulse p-6 space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-600 px-3">NOVA</h1>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleNavigation('transfer')}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              <ArrowRightIcon className="h-5 w-5 mr-2" />
              Transfer Funds
            </button>
            <button
              onClick={() => handleNavigation('deposit')}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
              Deposit Check
            </button>
            <div className="flex items-center bg-yellow-100 p-2 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-yellow-600 mr-2" />
              <span className="font-semibold">Paper Money: ${paperMoneyBalance}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Account Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-3xl font-bold">${account?.balance?.toLocaleString()}</p>
              </div>
              <CurrencyDollarIcon className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="text-3xl font-bold text-green-600">
                  +${financialStats.deposit?.toLocaleString() || 0}
                </p>
              </div>
              <ArrowUpIcon className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Expenses</p>
                <p className="text-3xl font-bold text-red-600">
                  -${financialStats.withdrawal?.toLocaleString() || 0}
                </p>
              </div>
              <ArrowDownIcon className="h-12 w-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Financial Overview Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'transactions', 'analytics', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="h-96">
                  <Bar
                    data={generateChartData(transactions, timeframe)}
                    options={chartOptions}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <QuickActionCard
                    icon={<ArrowRightIcon className="h-8 w-8" />}
                    title="Send Money"
                    action={() => handleNavigation('transfer')}
                  />
                  <QuickActionCard
                    icon={<DocumentArrowUpIcon className="h-8 w-8" />}
                    title="Mobile Deposit"
                    action={() => handleNavigation('deposit')}
                  />
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <TransactionTable transactions={transactions} />
            )}

            {activeTab === 'analytics' && <FinancialAnalytics account={account} />}
            
            {activeTab === 'settings' && <AccountSettings account={account} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components
const QuickActionCard = ({ icon, title, action }) => (
  <div
    onClick={action}
    className="bg-gray-50 p-6 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
  >
    <div className="flex items-center space-x-4">
      <div className="bg-white p-3 rounded-lg shadow-sm">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">Initiate a new transaction</p>
      </div>
    </div>
  </div>
);

const TransactionTable = ({ transactions }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(transaction.date).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">{transaction.description}</td>
            <td className={`px-6 py-4 ${
              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${Math.abs(transaction.amount).toFixed(2)}
            </td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                Completed
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const generateChartData = (transactions, timeframe) => {
  // Implement your chart data generation logic here
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Income',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: [2, 3, 20, 5, 1, 4, 7],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Financial Overview',
    },
  },
};

export default Dashboard;