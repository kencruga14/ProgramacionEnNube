import { Routes } from '@angular/router';

import { UserComponent } from '../../user/user.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user',           component: UserComponent },
    { path: 'notifications',  component: NotificationsComponent },
];
