import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Users, TrendingUp, Award, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Dumbbell className="text-emerald-500" size={32} />
              <span className="text-xl font-bold">FitTrack Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#about" className="hover:text-emerald-500 transition-colors">About</a>
              <a href="#pricing" className="hover:text-emerald-500 transition-colors">Pricing</a>
              <a href="#contact" className="hover:text-emerald-500 transition-colors">Contact</a>
              <Button onClick={() => navigate('/login')} variant="primary" size="sm">
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Transform Your Fitness Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Professional gym management and personalized workout tracking. Achieve your goals with expert guidance and data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/signup')} size="lg">
              Get Started Free
            </Button>
            <Button onClick={() => navigate('/login')} variant="secondary" size="lg">
              Member Login
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose FitTrack Pro?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="text-center py-8">
                <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-emerald-500" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                <p className="text-gray-400">Monitor your workouts, weight, and performance with detailed charts and analytics.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center py-8">
                <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-emerald-500" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Trainers</h3>
                <p className="text-gray-400">Get personalized workout plans designed by certified fitness professionals.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center py-8">
                <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-emerald-500" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Achieve Goals</h3>
                <p className="text-gray-400">Set targets, track milestones, and celebrate your fitness achievements.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Membership Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-2xl transition-shadow">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-4">Basic</h3>
                <div className="text-4xl font-bold mb-6">
                  $29<span className="text-xl text-gray-400">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Access to gym facilities
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Workout tracking app
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Basic workout plans
                  </li>
                </ul>
                <Button variant="secondary" className="w-full">Choose Plan</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-500 hover:shadow-2xl transition-shadow">
              <CardContent className="py-8">
                <div className="bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <div className="text-4xl font-bold mb-6">
                  $59<span className="text-xl text-gray-400">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Everything in Basic
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Personal trainer sessions
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Custom workout plans
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Progress analytics
                  </li>
                </ul>
                <Button className="w-full">Choose Plan</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-shadow">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-4">Elite</h3>
                <div className="text-4xl font-bold mb-6">
                  $99<span className="text-xl text-gray-400">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Unlimited trainer access
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Nutrition planning
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-500 mr-2">✓</span>
                    Priority support
                  </li>
                </ul>
                <Button variant="secondary" className="w-full">Choose Plan</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-emerald-500 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-400">123 Fitness Street, Gym City, GC 12345</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="text-emerald-500 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-400">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="text-emerald-500 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-400">info@fittrackpro.com</p>
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    label="Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 FitTrack Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
