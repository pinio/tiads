
package ninja.ygor.tiads;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;

import org.appcelerator.titanium.TiApplication;
import org.appcelerator.kroll.common.Log;
import org.appcelerator.kroll.common.TiConfig;

import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.google.android.gms.ads.identifier.AdvertisingIdClient.Info;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.common.GooglePlayServicesUtil;
import java.io.IOException;

import android.provider.Settings.Secure;

import android.os.AsyncTask;


@Kroll.module(name="TiAds", id="ninja.ygor.tiads")
public class TiAdsModule extends KrollModule {

    // Standard Debugging variables
    private static final String LCAT = "TiAdsModule";
    private static final boolean DBG = TiConfig.LOGD;
    
    // ADID State Variables
    public static String adidResult = "";
    public static boolean adidLimit = false;
    
    public TiAdsModule() {
        super();
    }
    
    private static class AdvertisingIdTask extends AsyncTask<Void, Void, AdvertisingIdClient.Info> {
        @Override
        protected AdvertisingIdClient.Info doInBackground(Void... params) {
            try {
                AdvertisingIdClient.Info idInfo = AdvertisingIdClient.getAdvertisingIdInfo(TiApplication.getInstance().getApplicationContext());
                return idInfo;
            } catch (GooglePlayServicesNotAvailableException e) {
                e.printStackTrace();
            } catch (GooglePlayServicesRepairableException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            return null;
        }
        @Override
        protected void onPostExecute(AdvertisingIdClient.Info advertId) {
            adidResult = advertId.getId();
            adidLimit = advertId.isLimitAdTrackingEnabled();
        }
       
    };
    
    
    @Kroll.onAppCreate
    public static void onAppCreate(TiApplication app) {
        Log.d(LCAT, "Initializing tiads module.");
        new AdvertisingIdTask().execute();
    }

    // Methods
    
    // Get ADID - Android Advertising ID
    @Kroll.getProperty @Kroll.method
    public String getAdvertisingIdInfo() {
        new AdvertisingIdTask().execute();
        return adidResult;
    }
    
    @Kroll.getProperty @Kroll.method
    public boolean isLimitAdTrackingEnabled() {
        new AdvertisingIdTask().execute();
        return adidLimit;
    }
    
    @Kroll.getProperty @Kroll.method
    public String getAndroidID() {
        return Secure.getString(TiApplication.getInstance().getApplicationContext().getContentResolver(), Secure.ANDROID_ID);
    }

}

