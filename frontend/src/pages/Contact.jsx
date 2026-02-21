import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import AnimatedBackground from '../components/AnimatedBackground'

const contactInfo = [
  { icon: Mail, title: "Email", value: "support@luxecart.com", description: "24/7 support response" },
  { icon: Phone, title: "Phone", value: "+1 (234) 567-890", description: "Mon-Fri 9AM-6PM EST" },
  { icon: MapPin, title: "Address", value: "123 Luxury Lane", description: "New York, NY 10001" },
  { icon: Clock, title: "Hours", value: "24/7 Online", description: "Always open for you" },
]

const faqs = [
  { question: "How do I track my order?", answer: "Once your order ships, you'll receive an email with a tracking number. You can also track your order in your account dashboard." },
  { question: "What is your return policy?", answer: "We offer a 30-day return policy for all unused items in original packaging. Simply initiate a return from your order history." },
  { question: "Do you ship internationally?", answer: "Yes! We ship to over 50 countries worldwide. Shipping rates and delivery times vary by location." },
  { question: "How does the AI recommendation system work?", answer: "Our AI analyzes your browsing patterns and purchase history to suggest products you'll love. The more you shop, the better it gets!" },
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      toast.success('Message sent successfully! We\'ll get back to you soon.')
    }, 2000)
  }

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <AnimatedBackground />
      
      <div className="relative z-10 section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold luxury-text font-['Playfair_Display'] mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center card-hover"
            >
              <div className="w-14 h-14 bg-luxury-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-7 h-7 text-luxury-gold" />
              </div>
              <h3 className="text-white font-semibold mb-1">{info.title}</h3>
              <p className="text-luxury-gold font-medium mb-1">{info.value}</p>
              <p className="text-gray-400 text-sm">{info.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-primary-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-['Playfair_Display']">Send a Message</h2>
                  <p className="text-gray-400 text-sm">We typically reply within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-luxury-gold transition-colors"
                  >
                    <option value="" className="bg-luxury-dark">Select a subject</option>
                    <option value="general" className="bg-luxury-dark">General Inquiry</option>
                    <option value="support" className="bg-luxury-dark">Technical Support</option>
                    <option value="order" className="bg-luxury-dark">Order Status</option>
                    <option value="returns" className="bg-luxury-dark">Returns & Refunds</option>
                    <option value="feedback" className="bg-luxury-dark">Feedback</option>
                    <option value="business" className="bg-luxury-dark">Business Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full glass-button flex items-center justify-center space-x-2 py-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass-card p-8 h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-luxury-accent rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-['Playfair_Display']">Frequently Asked</h2>
                  <p className="text-gray-400 text-sm">Quick answers to common questions</p>
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <h3 className="text-white font-semibold mb-2 flex items-start">
                      <CheckCircle className="w-5 h-5 text-luxury-gold mr-2 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-400 text-sm ml-7">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-luxury-gold/10 to-primary-500/10 rounded-xl border border-luxury-gold/20">
                <p className="text-gray-300 text-sm text-center">
                  Can't find what you're looking for?{' '}
                  <button className="text-luxury-gold hover:text-luxury-silver transition-colors font-medium">
                    Chat with our AI Assistant
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
