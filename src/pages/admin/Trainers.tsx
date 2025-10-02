import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { ArrowLeft, Plus, CreditCard as Edit, Trash2, Award } from 'lucide-react';
import { Trainer } from '../../types';

export const Trainers: React.FC = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    email: '',
    specialization: '',
    experience: ''
  });

  const [trainers, setTrainers] = useState<Trainer[]>([
    {
      id: '1',
      name: 'Alex Thompson',
      email: 'alex@fittrack.com',
      specialization: 'Strength Training',
      experience: 8
    },
    {
      id: '2',
      name: 'Sarah Martinez',
      email: 'sarah@fittrack.com',
      specialization: 'Cardio & Weight Loss',
      experience: 5
    },
    {
      id: '3',
      name: 'David Chen',
      email: 'david@fittrack.com',
      specialization: 'Bodybuilding',
      experience: 10
    }
  ]);

  const handleAddTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    const trainer: Trainer = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTrainer.name,
      email: newTrainer.email,
      specialization: newTrainer.specialization,
      experience: parseInt(newTrainer.experience)
    };
    setTrainers([...trainers, trainer]);
    setShowAddModal(false);
    setNewTrainer({ name: '', email: '', specialization: '', experience: '' });
  };

  const handleEditTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setShowEditModal(true);
  };

  const handleDeleteTrainer = (trainerId: string) => {
    if (confirm('Are you sure you want to delete this trainer?')) {
      setTrainers(trainers.filter(t => t.id !== trainerId));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button onClick={() => navigate('/admin')} variant="ghost">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Trainer Management</h1>
            <p className="text-gray-400 mt-1">Manage your gym's training staff</p>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus size={20} className="mr-2" />
            Add Trainer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <Card key={trainer.id}>
              <CardContent className="py-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-emerald-500/10 p-3 rounded-full">
                    <Award className="text-emerald-500" size={32} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTrainer(trainer)}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTrainer(trainer.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{trainer.name}</h3>
                <p className="text-gray-400 text-sm mb-1">{trainer.email}</p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm">Specialization</p>
                  <p className="text-white font-semibold">{trainer.specialization}</p>
                </div>
                <div className="mt-3">
                  <p className="text-gray-400 text-sm">Experience</p>
                  <p className="text-white font-semibold">{trainer.experience} years</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {trainers.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Award className="text-gray-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Trainers Yet</h3>
              <p className="text-gray-400 mb-4">Get started by adding your first trainer</p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus size={20} className="mr-2" />
                Add Trainer
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Trainer"
      >
        <form onSubmit={handleAddTrainer} className="space-y-4">
          <Input
            label="Full Name"
            value={newTrainer.name}
            onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={newTrainer.email}
            onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
            required
          />
          <Input
            label="Specialization"
            value={newTrainer.specialization}
            onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
            placeholder="e.g., Strength Training, Cardio, etc."
            required
          />
          <Input
            label="Years of Experience"
            type="number"
            value={newTrainer.experience}
            onChange={(e) => setNewTrainer({ ...newTrainer, experience: e.target.value })}
            min="0"
            required
          />
          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">Add Trainer</Button>
            <Button type="button" onClick={() => setShowAddModal(false)} variant="secondary" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Trainer"
      >
        {selectedTrainer && (
          <div className="space-y-4">
            <Input
              label="Full Name"
              defaultValue={selectedTrainer.name}
            />
            <Input
              label="Email"
              type="email"
              defaultValue={selectedTrainer.email}
            />
            <Input
              label="Specialization"
              defaultValue={selectedTrainer.specialization}
            />
            <Input
              label="Years of Experience"
              type="number"
              defaultValue={selectedTrainer.experience.toString()}
              min="0"
            />
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
