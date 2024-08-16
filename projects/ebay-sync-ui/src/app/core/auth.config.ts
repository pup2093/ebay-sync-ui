import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.authIssuerUrl,
  tokenEndpoint: environment.authTokenUrl,
  redirectUri: window.location.origin,
  clientId: 'ebay-sync-ui',
  responseType: 'code',
  scope: 'openid profile',
};

export function initializeOauth(
  oauthService: OAuthService,
): Promise<string | boolean> {
  handleEbayAuthRedirect();
  return new Promise((resolve, reject) => {
    oauthService.configure(authConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      if (oauthService.hasValidIdToken()) {
        resolve(true);
      } else {
        reject('Not authorized');
      }
    });
  });
}

function handleEbayAuthRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('ebay')) {
    const code = urlParams.get('code');
    localStorage.setItem('ebay_code', code as string);
  }
}
