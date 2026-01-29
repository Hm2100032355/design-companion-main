import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// My PG / Hostel
import BasicPGInfo from "./pages/pg/BasicPGInfo";
import LocationDetails from "./pages/pg/LocationDetails";
import PropertyStructure from "./pages/pg/PropertyStructure";
import RoomConfig from "./pages/pg/RoomConfig";
import Amenities from "./pages/pg/Amenities";
import FoodFacilities from "./pages/pg/FoodFacilities";
import PhotosMedia from "./pages/pg/PhotosMedia";
import VacancyAvailability from "./pages/pg/VacancyAvailability";
import RulesPolicies from "./pages/pg/RulesPolicies";
import OwnerContact from "./pages/pg/OwnerContact";
import Verification from "./pages/pg/Verification";

// Rooms & Beds
import RoomList from "./pages/rooms/RoomList";
import AddEditRoom from "./pages/rooms/AddEditRoom";
import BedConfiguration from "./pages/rooms/BedConfiguration";
import RoomOccupancy from "./pages/rooms/RoomOccupancy";
import MaintenanceStatus from "./pages/rooms/MaintenanceStatus";

// Vacancies
import CurrentVacancies from "./pages/vacancies/CurrentVacancies";
import UpdateVacancies from "./pages/vacancies/UpdateVacancies";
import SharingType from "./pages/vacancies/SharingType";
import VacancyHistory from "./pages/vacancies/VacancyHistory";

// Tenants
import TenantList from "./pages/tenants/TenantList";
import AddTenant from "./pages/tenants/AddTenant";
import TenantProfiles from "./pages/tenants/TenantProfiles";
import ActiveTenants from "./pages/tenants/ActiveTenants";
import VacatedTenants from "./pages/tenants/VacatedTenants";
import TenantDocuments from "./pages/tenants/TenantDocuments";

// Bookings
import NewBookings from "./pages/bookings/NewBookings";
import VisitRequests from "./pages/bookings/VisitRequests";
import ApprovedBookings from "./pages/bookings/ApprovedBookings";
import RejectedRequests from "./pages/bookings/RejectedRequests";

// Payments
import RentCollection from "./pages/payments/RentCollection";
import PendingPayments from "./pages/payments/PendingPayments";
import AdvancePayments from "./pages/payments/AdvancePayments";
import PaymentHistory from "./pages/payments/PaymentHistory";
import DownloadReceipts from "./pages/payments/DownloadReceipts";

// Complaints
import OpenComplaints from "./pages/complaints/OpenComplaints";
import InProgress from "./pages/complaints/InProgress";
import ResolvedComplaints from "./pages/complaints/ResolvedComplaints";
import AssignMaintenance from "./pages/complaints/AssignMaintenance";
import MaintenanceHistory from "./pages/complaints/MaintenanceHistory";

// Notices
import CreateNotice from "./pages/notices/CreateNotice";
import ActiveNotices from "./pages/notices/ActiveNotices";
import NoticeHistory from "./pages/notices/NoticeHistory";

// Reports
import OccupancyReport from "./pages/reports/OccupancyReport";
import RentReport from "./pages/reports/RentReport";
import TenantReport from "./pages/reports/TenantReport";
import ComplaintReport from "./pages/reports/ComplaintReport";
import MonthlySummary from "./pages/reports/MonthlySummary";

// Reviews
import PGRatings from "./pages/reviews/PGRatings";
import TenantReviews from "./pages/reviews/TenantReviews";
import ReplyToReviews from "./pages/reviews/ReplyToReviews";

// Settings
import ProfileSettings from "./pages/settings/ProfileSettings";
import PGSettings from "./pages/settings/PGSettings";
import RentSettings from "./pages/settings/RentSettings";
import NotificationPreferences from "./pages/settings/NotificationPreferences";
import SecuritySettings from "./pages/settings/SecuritySettings";

// Support
import ContactSupport from "./pages/support/ContactSupport";
import HelpFAQ from "./pages/support/HelpFAQ";
import RaiseTicket from "./pages/support/RaiseTicket";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />

            {/* My PG / Hostel */}
            <Route path="pg/basic" element={<BasicPGInfo />} />
            <Route path="pg/location" element={<LocationDetails />} />
            <Route path="pg/structure" element={<PropertyStructure />} />
            <Route path="pg/rooms" element={<RoomConfig />} />
            <Route path="pg/amenities" element={<Amenities />} />
            <Route path="pg/food" element={<FoodFacilities />} />
            <Route path="pg/photos" element={<PhotosMedia />} />
            <Route path="pg/vacancy" element={<VacancyAvailability />} />
            <Route path="pg/rules" element={<RulesPolicies />} />
            <Route path="pg/contact" element={<OwnerContact />} />
            <Route path="pg/verification" element={<Verification />} />

            {/* Rooms & Beds */}
            <Route path="rooms/list" element={<RoomList />} />
            <Route path="rooms/add" element={<AddEditRoom />} />
            <Route path="rooms/beds" element={<BedConfiguration />} />
            <Route path="rooms/occupancy" element={<RoomOccupancy />} />
            <Route path="rooms/maintenance" element={<MaintenanceStatus />} />

            {/* Vacancies */}
            <Route path="vacancies/current" element={<CurrentVacancies />} />
            <Route path="vacancies/update" element={<UpdateVacancies />} />
            <Route path="vacancies/sharing" element={<SharingType />} />
            <Route path="vacancies/history" element={<VacancyHistory />} />

            {/* Tenants */}
            <Route path="tenants/list" element={<TenantList />} />
            <Route path="tenants/add" element={<AddTenant />} />
            <Route path="tenants/profiles" element={<TenantProfiles />} />
            <Route path="tenants/active" element={<ActiveTenants />} />
            <Route path="tenants/vacated" element={<VacatedTenants />} />
            <Route path="tenants/documents" element={<TenantDocuments />} />

            {/* Bookings */}
            <Route path="bookings/new" element={<NewBookings />} />
            <Route path="bookings/visits" element={<VisitRequests />} />
            <Route path="bookings/approved" element={<ApprovedBookings />} />
            <Route path="bookings/rejected" element={<RejectedRequests />} />

            {/* Payments */}
            <Route path="payments/rent" element={<RentCollection />} />
            <Route path="payments/pending" element={<PendingPayments />} />
            <Route path="payments/advance" element={<AdvancePayments />} />
            <Route path="payments/history" element={<PaymentHistory />} />
            <Route path="payments/receipts" element={<DownloadReceipts />} />

            {/* Complaints */}
            <Route path="complaints/open" element={<OpenComplaints />} />
            <Route path="complaints/progress" element={<InProgress />} />
            <Route path="complaints/resolved" element={<ResolvedComplaints />} />
            <Route path="complaints/assign" element={<AssignMaintenance />} />
            <Route path="complaints/history" element={<MaintenanceHistory />} />

            {/* Notices */}
            <Route path="notices/create" element={<CreateNotice />} />
            <Route path="notices/active" element={<ActiveNotices />} />
            <Route path="notices/history" element={<NoticeHistory />} />

            {/* Reports */}
            <Route path="reports/occupancy" element={<OccupancyReport />} />
            <Route path="reports/rent" element={<RentReport />} />
            <Route path="reports/tenants" element={<TenantReport />} />
            <Route path="reports/complaints" element={<ComplaintReport />} />
            <Route path="reports/monthly" element={<MonthlySummary />} />

            {/* Reviews */}
            <Route path="reviews/ratings" element={<PGRatings />} />
            <Route path="reviews/tenant" element={<TenantReviews />} />
            <Route path="reviews/reply" element={<ReplyToReviews />} />

            {/* Settings */}
            <Route path="settings/profile" element={<ProfileSettings />} />
            <Route path="settings/pg" element={<PGSettings />} />
            <Route path="settings/rent" element={<RentSettings />} />
            <Route
              path="settings/notifications"
              element={<NotificationPreferences />}
            />
            <Route path="settings/security" element={<SecuritySettings />} />

            {/* Support */}
            <Route path="support/contact" element={<ContactSupport />} />
            <Route path="support/faq" element={<HelpFAQ />} />
            <Route path="support/ticket" element={<RaiseTicket />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
