# Windows Server 2019 Steps
# Source: https://bcthomas.com/2019/02/getting-started-with-linux-containers-on-windows-server-2019/

# Install Nuget
Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force

# Install Docker Dependencies
Install-Module DockerMSFTProvider
Import-Module -Name DockerMSFTProvider -Force
Import-Packageprovider -Name DockerMSFTProvider -Force

# Install Containers and Hyper-V
Install-WindowsFeature Containers,Hyper-V
Restart-Computer

#**************************************************************************************
# NOTE: Will need to enable Nested Hyper-V if running docker in a Windows VM
# 1. Shutdown VM 
# Run the following command in Powershell on Host machine
#     Set-VMProcessor -VMName <Target VM's Name> -ExposeVirtualizationExtensions $true
# The next command will check if ExposeVirtualizationExtensions was enabled
#     Get-VMProcessor -VMName <Target VM's name> | fl *
# Source: https://www.altaro.com/hyper-v/creating-nested-hyper-v-windows-server-2016/
#**************************************************************************************

# Install Docker
Install-Package -Name Docker -Source DockerDefault
Restart-Computer

# Configure Docker to use LCOW (Linux_Container_On_Windows)
[Environment]::SetEnvironmentVariable("LCOW_SUPPORTED", "1", "Machine")
 
# Enable Experimental Features in Dockerd daemon.conf
$configfile = @"
{
    "experimental": true
}
"@
$configfile|Out-File -FilePath C:\ProgramData\docker\config\daemon.json -Encoding ascii -Force

# Deploy LCOW
Invoke-WebRequest -Uri "https://github.com/linuxkit/lcow/releases/download/v4.14.35-v0.3.9/release.zip" -UseBasicParsing -OutFile release.zip
Expand-Archive release.zip -DestinationPath "$Env:ProgramFiles\Linux Containers\."

# Set Environment Variable so --platform doesn't need to be set each time a container is started
[Environment]::SetEnvironmentVariable("LCOW_API_PLATFORM_IF_OMITTED", "linux", "Machine")

# Login to Docker
$username = Read-Host 'Docker Username'
$password = Read-Host 'Docker Password'
$password | docker login --username $username --password-stdin

# Start container
$version = Read-Host 'Application Version'
docker run -p 4200:4200 -itd joshnano/angular-simple:$version