# Quick Start Guide

## 1. Initialize the System (First Time Only)

```
Visit: http://localhost:3000/setup
Click: "Create Admin Account"
```

This creates:
- Username: `admin`
- Password: `admin123`

## 2. Log In to Admin Panel

```
Visit: http://localhost:3000/admin/login
Username: admin
Password: admin123
```

## 3. Create Time Slots (Admin Only)

In the Admin Dashboard:
1. Click "Add Time Slot" button
2. Select a future date
3. Select appointment time
4. Click "Save"

Repeat to create multiple slots.

## 4. Book Appointment (Patient)

```
Visit: http://localhost:3000/book-appointment
1. Select a time slot from the left panel
2. Fill in patient information
3. Click "Book Appointment"
4. Print or download invoice
```

## 5. View Appointments (Admin)

In the Admin Dashboard:
- See all booked appointments in the table
- Click "View" to access invoice details

## 6. Download/Print Invoice

On the Invoice page:
- Click "Download PDF" to save as PDF
- Click "Print" to print directly
- Right-click and "Save As" for manual saving

---

## Key URLs

| URL | Purpose |
|-----|---------|
| `/` | Home page |
| `/setup` | Initial admin setup |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin control panel |
| `/book-appointment` | Patient booking form |
| `/invoice/[id]` | View/print invoice |

---

## Default Admin Credentials

```
Username: admin
Password: admin123
```

⚠️ **Change these credentials in production!**

---

## Database Credentials

The system uses Supabase (already configured). Your credentials are in `.env`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## Common Tasks

### Add More Admin Users
1. Use database client to insert into `admin` table
2. Or create additional UI for admin management

### Modify Invoice Details
Edit `/app/book-appointment/page.jsx`:
- Doctor name
- Doctor specialty
- License number
- Consultation fee

### Change Colors/Styling
All files use Tailwind CSS - modify class names in component files

### Enable Email Notifications
Add nodemailer or similar service to `/app/book-appointment/page.jsx`

---

## Features Included

✅ Patient appointment booking
✅ Admin availability management
✅ Automatic invoice generation
✅ Printable/downloadable invoices
✅ Cash payment tracking
✅ Responsive design
✅ Time slot management
✅ Appointment history

---

## System Status

Build Status: ✅ SUCCESS
Database: ✅ Connected (Supabase)
Admin Setup: ✅ Ready (Visit /setup)

---

Need help? Check `APPOINTMENT_SYSTEM_GUIDE.md` for detailed documentation.
