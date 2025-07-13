import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';

const ContactForm = ({ onSubmit, initialValues = {}, isEditing = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when initialValues change (important for editing)
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const submitForm = (data) => {
    setIsSubmitting(true);
    onSubmit({ ...initialValues, ...data }); // merge in case of editing
    reset();
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {isEditing ? 'Update Contact' : 'Add New Contact'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            {...register('firstName', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && <span className="text-red-500 text-xs">First Name is required</span>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            {...register('lastName', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <span className="text-red-500 text-xs">Last Name is required</span>}
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="text-red-500 text-xs">Please enter a valid email</span>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
          type="tel"
          {...register('phone', {
          required: 'Phone number is required',
          pattern: {
          value: /^[0-9]{10}$/,
          message: 'Phone number must be 10 digits'
          }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            {...register('address')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full transition-all duration-200"
      >
        <Save className="w-5 h-5" />
        {isSubmitting ? (isEditing ? 'Updating...' : 'Saving...') : isEditing ? 'Update Contact' : 'Save Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
