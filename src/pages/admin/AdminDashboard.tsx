import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Users, Dumbbell, DollarSign, TrendingUp, CreditCard as Edit, Trash2, Plus } from 'lucide-react';
import { Member } from '../../types';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    subscriptionPlan: 'Basic'
  });

  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      userId: 'u1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      subscriptionPlan: 'Pro',
      subscriptionStatus: 'active',
      subscriptionEndDate: '2025-11-01',
      joinDate: '2025-01-15'
    },
    {
      id: '2',
      userId: 'u2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      subscriptionPlan: 'Basic',
      subscriptionStatus: 'active',
      subscriptionEndDate: '2025-10-20',
      joinDate: '2025-02-10'
    },
    {
      id: '3',
      userId: 'u3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '(555) 456-7890',
      subscriptionPlan: 'Elite',
      subscriptionStatus: 'active',
      subscriptionEndDate: '2025-12-05',
      joinDate: '2025-03-20'
    }
  ]);

  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.subscriptionStatus === 'active').length,
    monthlyRevenue: members.reduce((sum, m) => {
      const prices: { [key: string]: number } = { Basic: 29, Pro: 59, Elite: 99 };
      return sum + (m.subscriptionPlan ? prices[m.subscriptionPlan] : 0);
    }, 0),
    newThisMonth: 5
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const member: Member = {
      id: Math.random().toString(36).substr(2, 9),
      userId: Math.random().toString(36).substr(2, 9),
      name: newMember.name,
      email: newMember.email,
      phone: newMember.phone,
      subscriptionPlan: newMember.subscriptionPlan,
      subscriptionStatus: 'active',
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0]
    };
    setMembers([...members, member]);
    setShowAddModal(false);
    setNewMember({ name: '', email: '', phone: '', subscriptionPlan: 'Basic' });
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleDeleteMember = (memberId: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage your gym operations</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={() => navigate('/admin/trainers')}>
              <Dumbbell size={20} className="mr-2" />
              Manage Trainers
            </Button>
            <Button onClick={() => navigate('/admin/workouts')}>
              Workout Plans
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Members</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.totalMembers}</p>
                </div>
                <Users className="text-emerald-500" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Members</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.activeMembers}</p>
                </div>
                <TrendingUp className="text-blue-500" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-white mt-1">${stats.monthlyRevenue}</p>
                </div>
                <DollarSign className="text-emerald-500" size={40} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New This Month</p>
                  <p className="text-3xl font-bold text-white mt-1">{stats.newThisMonth}</p>
                </div>
                <Users className="text-orange-500" size={40} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Members</h2>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus size={20} className="mr-2" />
                Add Member
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Phone</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Plan</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b border-gray-700 hover:bg-gray-900/50">
                      <td className="py-3 px-4 text-white">{member.name}</td>
                      <td className="py-3 px-4 text-gray-400">{member.email}</td>
                      <td className="py-3 px-4 text-gray-400">{member.phone}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-emerald-900/30 text-emerald-500 rounded-full text-sm">
                          {member.subscriptionPlan}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          member.subscriptionStatus === 'active'
                            ? 'bg-green-900/30 text-green-500'
                            : 'bg-red-900/30 text-red-500'
                        }`}>
                          {member.subscriptionStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditMember(member)}
                            className="text-blue-500 hover:text-blue-400"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Member"
      >
        <form onSubmit={handleAddMember} className="space-y-4">
          <Input
            label="Full Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            required
          />
          <Input
            label="Phone"
            value={newMember.phone}
            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subscription Plan
            </label>
            <select
              value={newMember.subscriptionPlan}
              onChange={(e) => setNewMember({ ...newMember, subscriptionPlan: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="Basic">Basic - $29/mo</option>
              <option value="Pro">Pro - $59/mo</option>
              <option value="Elite">Elite - $99/mo</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">Add Member</Button>
            <Button type="button" onClick={() => setShowAddModal(false)} variant="secondary" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Member"
      >
        {selectedMember && (
          <div className="space-y-4">
            <Input
              label="Full Name"
              defaultValue={selectedMember.name}
            />
            <Input
              label="Email"
              type="email"
              defaultValue={selectedMember.email}
            />
            <Input
              label="Phone"
              defaultValue={selectedMember.phone}
            />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subscription Plan
              </label>
              <select
                defaultValue={selectedMember.subscriptionPlan}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Basic">Basic - $29/mo</option>
                <option value="Pro">Pro - $59/mo</option>
                <option value="Elite">Elite - $99/mo</option>
              </select>
            </div>
            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">Save Changes</Button>
              <Button onClick={() => setShowEditModal(false)} variant="secondary" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};
