import { useState } from 'react';
import { Mail, MessageCircle, FileText, Send, CheckCircle, AlertCircle } from 'lucide-react';

export function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'technical',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // In production, this would send to your backend
      // For now, simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'technical',
        message: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again or email us directly at support@mentalpath.ca');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[var(--ink)] mb-2">Support & Contact</h1>
        <p className="text-[var(--ink-muted)] text-sm">
          Get help with MentalPath or reach out to our team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Methods */}
        <div className="lg:col-span-1 space-y-4">
          {/* Email Support */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[var(--sage-pale)] rounded-lg">
                <Mail className="w-5 h-5 text-[var(--sage)]" />
              </div>
              <div>
                <h3 className="font-medium text-[var(--ink)] mb-1">Email Support</h3>
                <p className="text-xs text-[var(--ink-muted)] mb-3">
                  Response within 4 business hours
                </p>
                <a
                  href="mailto:support@mentalpath.ca"
                  className="text-sm text-[var(--sage)] hover:text-[var(--sage-deep)] font-medium"
                >
                  support@mentalpath.ca
                </a>
              </div>
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[var(--sage-pale)] rounded-lg">
                <MessageCircle className="w-5 h-5 text-[var(--sage)]" />
              </div>
              <div>
                <h3 className="font-medium text-[var(--ink)] mb-1">Live Chat</h3>
                <p className="text-xs text-[var(--ink-muted)] mb-3">
                  Mon-Fri, 9am-5pm ET
                </p>
                <button
                  onClick={() => alert('Chat feature coming soon! For now, please email support@mentalpath.ca')}
                  className="text-sm text-[var(--sage)] hover:text-[var(--sage-deep)] font-medium"
                >
                  Start chat
                </button>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[var(--sage-pale)] rounded-lg">
                <FileText className="w-5 h-5 text-[var(--sage)]" />
              </div>
              <div>
                <h3 className="font-medium text-[var(--ink)] mb-1">Knowledge Base</h3>
                <p className="text-xs text-[var(--ink-muted)] mb-3">
                  Self-serve help articles
                </p>
                <a
                  href="/dashboard/faq"
                  className="text-sm text-[var(--sage)] hover:text-[var(--sage-deep)] font-medium"
                >
                  Browse FAQs
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-[var(--warm)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="font-medium text-[var(--ink)] mb-3 text-sm">Support Hours</h3>
            <div className="space-y-2 text-xs text-[var(--ink-soft)]">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium">9am - 5pm ET</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday - Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
            <p className="text-xs text-[var(--ink-muted)] mt-3">
              Email support available 24/7. We'll respond on the next business day.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
            <h2 className="text-lg font-serif text-[var(--ink)] mb-4">Send us a message</h2>

            {/* Success Message */}
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">Message sent successfully!</h4>
                  <p className="text-sm text-green-700">
                    We'll get back to you within 4 business hours at the email address you provided.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900 mb-1">Failed to send</h4>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--ink)] mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sage)] bg-white"
                    placeholder="Dr. Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--ink)] mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sage)] bg-white"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-[var(--ink)] mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sage)] bg-white"
                >
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing & Subscriptions</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="compliance">PHIPA / Compliance Question</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[var(--ink)] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sage)] bg-white"
                  placeholder="Brief description of your issue"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--ink)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sage)] resize-none bg-white"
                  placeholder="Please provide as much detail as possible..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-3 bg-[var(--sage)] text-white rounded-lg hover:bg-[var(--sage-deep)] transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-[var(--ink-muted)] disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Send className="w-4 h-4 animate-pulse" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="font-medium text-blue-900 mb-3 text-sm">💡 Quick Tips</h3>
            <ul className="space-y-2 text-xs text-blue-800">
              <li>• For faster support, include your account email and a detailed description</li>
              <li>• For billing issues, include your invoice number or subscription ID</li>
              <li>• For technical issues, mention your browser and operating system</li>
              <li>• Check our <a href="/dashboard/faq" className="underline font-medium">FAQ page</a> for instant answers to common questions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
