import { Route } from '@vaadin/router';
import Role from './generated/com/pannefo/application/data/Role';
import { appStore } from './stores/app-store';
import './views/about/about-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  requiresLogin?: boolean;
  rolesAllowed?: Role[];
  children?: ViewRoute[];
};

export const hasAccess = (route: Route) => {
  const viewRoute = route as ViewRoute;
  if (viewRoute.requiresLogin && !appStore.loggedIn) {
    return false;
  }

  if (viewRoute.rolesAllowed) {
    return viewRoute.rolesAllowed.some((role) => appStore.isUserInRole(role));
  }
  return true;
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'about-view',
    icon: '',
    title: '',
  },
  {
    path: 'about',
    component: 'about-view',
    icon: 'la la-th-list',
    title: 'About',
  },
  {
    path: 'registration',
    component: 'registration-view',
    rolesAllowed: [Role.ADMIN],
    icon: 'la la-columns',
    title: 'Registration',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/registration/registration-view');
      return;
    },
  },
  {
    path: 'home',
    component: 'home-view',
    icon: 'la la-file',
    title: 'Home',
    action: async (_context, _command) => {
      await import('./views/home/home-view');
      return;
    },
  },
  {
    path: 'leadership',
    component: 'leadership-view',
    icon: 'la la-list',
    title: 'Leadership',
    action: async (_context, _command) => {
      await import('./views/leadership/leadership-view');
      return;
    },
  },
  {
    path: 'departments',
    component: 'departments-view',
    icon: 'la la-list',
    title: 'Departments',
    action: async (_context, _command) => {
      await import('./views/departments/departments-view');
      return;
    },
  },
  {
    path: 'speeches',
    component: 'speeches-view',
    icon: 'la la-text-width',
    title: 'Speeches',
    action: async (_context, _command) => {
      await import('./views/speeches/speeches-view');
      return;
    },
  },
  {
    path: 'news',
    component: 'news-view',
    icon: 'lab la-drupal',
    title: 'News',
    action: async (_context, _command) => {
      await import('./views/news/news-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: 'login',
    component: 'login-view',
    icon: '',
    title: 'Login',
    action: async (_context, _command) => {
      await import('./views/login/login-view');
      return;
    },
  },

  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
