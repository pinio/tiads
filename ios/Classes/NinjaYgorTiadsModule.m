/**
 * TiAds
 *
 * Created by Ygor Lemos
 *
 */

#import "NinjaYgorTiadsModule.h"
#import "TiBase.h"
#import "TiHost.h"
#import "TiUtils.h"

#import <AdSupport/AdSupport.h>


@implementation NinjaYgorTiadsModule

#pragma mark Internal

// this is generated for your module, please do not change it
-(id)moduleGUID
{
	return @"0c092039-ebfa-43fb-a74e-0a0e9c776d1a";
}

// this is generated for your module, please do not change it
-(NSString*)moduleId
{
	return @"ninja.ygor.tiads";
}

#pragma mark Lifecycle

-(void)startup
{
	// this method is called when the module is first loaded
	// you *must* call the superclass
	[super startup];

	NSLog(@"[INFO] %@ loaded",self);
}

-(void)shutdown:(id)sender
{
	// this method is called when the module is being unloaded
	// typically this is during shutdown. make sure you don't do too
	// much processing here or the app will be quit forceably

	// you *must* call the superclass
	[super shutdown:sender];
}

#pragma mark Cleanup

-(void)dealloc
{
	// release any resources that have been retained by the module
	[super dealloc];
}

#pragma mark Internal Memory Management

-(void)didReceiveMemoryWarning:(NSNotification*)notification
{
	// optionally release any resources that can be dynamically
	// reloaded once memory is available - such as caches
	[super didReceiveMemoryWarning:notification];
}

#pragma Public APIs

-(id)identifierForVendor
{
    if([[UIDevice currentDevice] respondsToSelector:@selector(identifierForVendor)]) {
        return [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    }
    
    return nil;
}

-(id)isAdvertisingTrackingEnabled
{
    if([[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled]) {
        return NUMBOOL(YES);
    } else {
        return NUMBOOL(NO);
    }
}

-(id)advertisingIdentifier
{
    if([[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled]) {
        NSUUID *IDFA = [[ASIdentifierManager sharedManager] advertisingIdentifier];
        return [IDFA UUIDString];
    }
    
    return nil;
}

@end
