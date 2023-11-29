package com.awesomeproject2

import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ReloadModule internal constructor(context: ReactApplicationContext?) :
  ReactContextBaseJavaModule(context) {
  override fun getName(): String {
    return "ReloadModule"
  }

  @ReactMethod
  fun reloadIt() {
    Log.d("ReloadModule", "reloadIt called")
    try {
      val instanceManager = resolveInstanceManager()
      if (instanceManager == null) {
        Log.d("ReloadModule", "failed")
        return
      }
      Handler(Looper.getMainLooper()).post {
        try {
          instanceManager.recreateReactContextInBackground()
        } catch (t: Throwable) {
          Log.d("ReloadModule", "failed")
        }
      }
    } catch (t: Throwable) {
      Log.d("ReloadModule", "failed")
    }
  }

  @Throws(NoSuchFieldException::class, IllegalAccessException::class)
  private fun resolveInstanceManager(): ReactInstanceManager? {
    val currentActivity = currentActivity ?: return null
    val reactApplication = currentActivity.application as ReactApplication
    return reactApplication.reactNativeHost.reactInstanceManager
  }
}