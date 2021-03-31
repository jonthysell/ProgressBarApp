#include "pch.h"
#include "ReactPackageProvider.h"
#include "NativeModules.h"

#include "ProgressBarViewManager.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::progressbarapp::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
    AddAttributedModules(packageBuilder);
    packageBuilder.AddViewManager(L"ProgressBarViewManager", []() { return winrt::make<ProgressBarViewManager>(); });
}

} // namespace winrt::progressbarapp::implementation
