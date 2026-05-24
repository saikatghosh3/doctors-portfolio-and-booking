# PulseCardiology Appointment System - Complete Guide

## Overview

This is a complete appointment booking system for PulseCardiology that includes:
- **Patient Booking Interface** - Patients can view available time slots and book appointments
- **Admin Panel** - Doctor/Admin can manage appointment availability
- **Invoice System** - Automatic invoice generation with printable PDF
- **Cash Payment** - Payment collected at the time of appointment
- **Responsive Design** - Works on desktop and mobile devices

## System Features

### 1. Patient Features
- View available appointment time slots
- Book appointments with personal information
- Get instant confirmation with invoice
- Print invoice for personal records
- Download invoice as PDF

### 2. Admin Features
- Simple username/password login
- Create and manage appointment time slots
- View all scheduled appointments
- Access appointment details
- View and manage invoices

### 3. Invoice Features
- Automatic invoice generation after booking
- Complete doctor information
- Complete patient information
- Appointment details
- Professional printable format
- PDF download capability
- Cash payment indicator

## Getting Started

### Initial Setup

1. **Navigate to Setup Page**
   ```
   Go to: http://localhost:3000/setup
   ```

2. **Create Admin Account**
   - Click "Create Admin Account" button
   - This creates the default admin user with:
     - Username: `admin`
     - Password: `admin123`

3. **Access Admin Panel**
   - Go to: http://localhost:3000/admin/login
   - Login with username: `admin` and password: `admin123`

### Default Admin Credentials
```
Username: admin
Password: admin123
```

## System Architecture

### Pages Structure

```
/                              - Home page with booking CTA
/book-appointment              - Patient booking form
/invoice/[id]                  - Invoice view and download
/admin/login                   - Admin login page
/admin/dashboard               - Admin control panel
/setup                         - Initial system setup
```

### Database Tables

1. **admin**
   - id (UUID)
   - username (text)
   - password (text)
   - created_at (timestamp)

2. **time_slots**
   - id (UUID)
   - date (date)
   - time (time)
   - is_available (boolean)
   - appointment_id (UUID reference)
   - created_at, updated_at (timestamps)

3. **appointments**
   - id (UUID)
   - patient_name, patient_email, patient_phone, patient_address
   - appointment_date, appointment_time
   - reason_for_visit
   - status
   - time_slot_id (reference)
   - created_at, updated_at (timestamps)

4. **invoices**
   - id (UUID)
   - invoice_number (text)
   - appointment_id (UUID reference)
   - patient_* fields (name, email, phone, address)
   - doctor_* fields (name, specialty, license)
   - appointment details
   - amount, payment_status
   - created_at, updated_at (timestamps)

## Workflow

### Patient Booking Flow

1. Patient visits home page
2. Clicks "Book Appointment"
3. Selects available time slot from calendar
4. Fills in personal information:
   - Full Name
   - Email
   - Phone Number
   - Address (optional)
   - Reason for visit
5. Submits form
6. System creates:
   - Appointment record
   - Invoice record
   - Marks time slot as unavailable
7. Patient is redirected to invoice page
8. Patient can print or download invoice as PDF

### Admin Management Flow

1. Admin logs in with credentials
2. Views all appointments in table
3. Can manage time slots:
   - Add new time slots (date and time)
   - Delete available slots
   - View slot availability status
4. Can view individual appointments
5. Can access invoices from appointment details

## Key Features Explained

### Time Slot Management
- Admin can add future appointment slots
- Each slot has a date and time
- Once a patient books, slot becomes unavailable
- Admin can delete unused slots

### Invoice System
- Automatically generated when appointment is booked
- Includes:
  - Doctor information (Dr. Alistair Thorne, Cardiology specialist)
  - Patient information (all fields they provided)
  - Appointment details (date and time)
  - Reason for visit
  - Payment status: "PENDING (Cash at Appointment)"
  - Professional signature area
- Can be printed or downloaded as PDF

### Payment
- No advance payment required
- Cash payment at appointment time
- Invoice shows payment status as PENDING

## Technology Stack

- **Frontend**: Next.js 13, React 18, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **PDF Generation**: html2pdf.js
- **Icons**: Lucide React
- **Authentication**: Simple session-based for admin

## Environment Variables

The following variables are pre-configured:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Running the Application

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Important Notes

### Security Considerations
- This is a basic system suitable for MVP/demo
- In production, implement:
  - Proper password hashing
  - Session management
  - Email verification
  - More robust authentication
  - Rate limiting

### Data Safety
- All data is stored in Supabase PostgreSQL
- Regular backups are recommended
- Row-level security (RLS) policies are implemented

### Browser Support
- Chrome, Firefox, Safari (latest versions)
- Mobile responsive design
- Print-to-PDF works in all modern browsers

## Troubleshooting

### Admin Can't Login
1. Check if admin account was created (visit /setup)
2. Verify username and password are correct
3. Check browser console for errors

### Time Slots Not Showing
1. Admin must create slots first (Admin Dashboard)
2. Slots must have future dates
3. Slots must have is_available = true

### Invoice Not Generating
1. Check if appointment was created successfully
2. Verify appointment has corresponding invoice in database
3. Check browser console for errors

### Print Not Working
1. Use browser print dialog (Ctrl+P or Cmd+P)
2. Select "Save as PDF" as printer
3. Or use "Download PDF" button

## Customization

### Change Doctor Information
Edit the invoice generation in `/app/book-appointment/page.jsx`:
```javascript
doctor_name: 'Dr. Alistair Thorne',
doctor_specialty: 'Cardiology',
doctor_license: 'LIC-12345-CARDIO',
```

### Change Invoice Amount
Modify in `/app/book-appointment/page.jsx` when creating invoice:
```javascript
amount: 0, // Change this to your consultation fee
```

### Styling
All styling uses Tailwind CSS classes. Modify colors in individual component files.

## Support

For issues or questions, refer to:
- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

**Built with Next.js, React, Supabase, and Tailwind CSS**
